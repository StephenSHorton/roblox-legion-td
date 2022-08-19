import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import Make from "@rbxts/make";

const PathfindingService = game.GetService("PathfindingService")

/** main AI controller
 * TODO test if can handle multiple AI 🤹‍♂️
 * TODO test clearTargetPath() if moving humanoid to self location solves stuttering (or anything at all) 🪲
 * TODO observe script usage if it's still running when all ai are destroyed 🤔
 */
@Component({
  tag: "AI"
})
export class AIController extends BaseComponent implements OnStart {
  private target?: Model

  onStart(): void {
    //TODO find
    this.initMode('Sentry')
  }


  initMode(mode: 'Sentry' | 'Attack' | 'Travel') {
    switch (mode) {
      // TODO implement sentry mode
      // case 'Sentry': // for AI that defend the lanes
      //   sentryMode()
      //   break
      case 'Attack': // for AI that attack the king
        this.attackMode()
        break
    }
  }

  attackMode() {
    throw warn("AIController.attackMode() not implemented.");
  }
  
  private waypoints: PathWaypoint[] = []
  private nextWaypointIndex = 1
  private reachedConnection?: RBXScriptConnection
  private blockedConnection?: RBXScriptConnection

  pathTo(goal: Vector3) {
    //instance validation
    if (!this.instance.IsA("Model")) {
      throw error("AIController must be attached to a Model")
    }
    if (!this.instance.PrimaryPart) {
      throw error("AIController must be attached to a Model with a PrimaryPart")
    }
    const humanoid = this.instance.FindFirstChildOfClass("Humanoid")
    if (!humanoid) {
      throw error("AIController must be attached to a Model with a Humanoid")
    }
    //create path
    const path = PathfindingService.CreatePath({
      AgentHeight: 4,
      AgentRadius: 3,
      AgentCanJump: false,
    })
    //compute path
    path.ComputeAsync(this.instance.PrimaryPart.Position, goal)
    //if not successful path, clear target
    if (path.Status !== Enum.PathStatus.Success) return this.clearTargetPath([], humanoid)

    this.waypoints = path.GetWaypoints()
    this.waypoints.shift()
    const drawnPath = this.drawPath(this.waypoints)
    drawnPath[0].BrickColor = new BrickColor("Really blue")

    //setup blocked connection
    this.blockedConnection = path.Blocked.Connect((blockedWaypointIndex) => {
      //check if the obstacle is further down the path
      if (blockedWaypointIndex >= this.nextWaypointIndex) {
        return this.clearTargetPath(drawnPath, humanoid)
      }
    })

    //detect when movement to next waypoint is complete
    if (!this.reachedConnection) {
      this.reachedConnection = humanoid.MoveToFinished.Connect((reached) => {
        if (reached && this.nextWaypointIndex < this.waypoints.size() - 1) {
          //increase waypoint index and move to next waypoint
          drawnPath[this.nextWaypointIndex].Destroy()
          this.nextWaypointIndex++
          drawnPath[this.nextWaypointIndex].BrickColor = new BrickColor("Lime green")
          const nextWaypoint = this.waypoints[this.nextWaypointIndex]
          if (!nextWaypoint) return this.clearTargetPath(drawnPath, humanoid)
          humanoid.MoveTo(nextWaypoint.Position)
        } else {
          drawnPath.forEach(part => part.Destroy())
          return this.clearTargetPath(drawnPath, humanoid)
        }
      })
    }

    if (this.waypoints.size() === 0) return this.clearTargetPath(drawnPath, humanoid)
    const nextWaypoint = this.waypoints[this.nextWaypointIndex]
    if (!nextWaypoint) return this.clearTargetPath(drawnPath, humanoid)
    humanoid.MoveTo(nextWaypoint.Position)
  }

  clearTargetPath(drawnPath: Part[], humanoid: Humanoid) {
    print("Clearing target path...")
    drawnPath.forEach(part => part.Destroy())
    this.target = undefined
    this.blockedConnection?.Disconnect()
    this.reachedConnection?.Disconnect()
    this.blockedConnection = undefined
    this.reachedConnection = undefined
    this.nextWaypointIndex = 1
  }

  drawPath(waypoints: PathWaypoint[]) {
    const drawnPath: Part[] = []
    waypoints.forEach((wp, index) => {
      drawnPath.push(Make("Part", {
        Name: `Waypoint-${index}`,
        Parent: game.Workspace,
        Anchored: true,
        CanCollide: false,
        Size: new Vector3(1, 1, 1),
        Shape: Enum.PartType.Ball,
        CFrame: new CFrame(wp.Position),
        Material: Enum.Material.Glass,
        BrickColor: new BrickColor("Really red"),
      }))
    })
    return drawnPath
  }
}