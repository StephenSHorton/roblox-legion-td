import { OnTick } from "@flamework/core"
import { Component, BaseComponent } from "@flamework/components"

const PathfindingService = game.GetService("PathfindingService")
const CollectionService = game.GetService("CollectionService")

type Attributes = {
  targetTag: string //TODO probably standardize this "Player" | "Enemy" | "Ally" ???
}

/** controller for AI
 * TODO stuttering is occuring. Starting to feel like npc pathfinding aint worth it. Maybe just move them more stupidly? Like go somewhere, if encounter enemy then attack?
 */
@Component({
  tag: "AI",
  defaults: {
    targetTag: "Player",
  },
})
export class AIController extends BaseComponent<Attributes> implements OnTick {
  private target?: Model

  onTick(): void {
    //find target
    if (!this.target) return this.findTarget()
  }

  /** locates the nearest model in workspace with a tag that matches the targetTag attribute
   * TODO is it better to locate targets by proximity instead of the whole workspace? (might be the same amount of work just scanning the workspace AND by distance)
   */
  findTarget() {
    const Roger111 = game.Workspace.FindFirstChild("Roger111") as Model | undefined
    if (!Roger111) return
    this.target = Roger111
      this.pursueTarget(Roger111)
  }

  private waypoints: PathWaypoint[] = []
  private nextWaypointIndex = 1
  private reachedConnection?: RBXScriptConnection
  private blockedConnection?: RBXScriptConnection

  pursueTarget(target: Model) {
    //checks
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
    if (!target.PrimaryPart) return this.clearTargetPath()

    //create path
    const path = PathfindingService.CreatePath({
      AgentHeight: 4,
      AgentRadius: 3,
      AgentCanJump: false,
    })
    //compute path
    const start = this.instance.PrimaryPart.Position
    const finish = target.PrimaryPart.Position
    path.ComputeAsync(start, finish)
    //if not successful path, clear target
    if (path.Status !== Enum.PathStatus.Success) return this.clearTargetPath()

    this.waypoints = path.GetWaypoints()

    //setup blocked connection
    this.blockedConnection = path.Blocked.Connect((blockedWaypointIndex) => {
      //check if the obstacle is further down the path
      if (blockedWaypointIndex >= this.nextWaypointIndex) {
        return this.clearTargetPath()
      }
    })

    //detect when movement to next waypoint is complete
    if (!this.reachedConnection) {
      this.reachedConnection = humanoid.MoveToFinished.Connect((reached) => {
        if (reached && this.nextWaypointIndex < this.waypoints.size() - 1) {
          //increase waypoint index and move to next waypoint
          this.nextWaypointIndex++
          const nextWaypoint = this.waypoints[this.nextWaypointIndex]
          if (!nextWaypoint) return this.clearTargetPath()
          humanoid.MoveTo(nextWaypoint.Position)
        } else {
          return this.clearTargetPath()
        }
      })
    }

    if (this.waypoints.size() === 0) return this.clearTargetPath()
    const nextWaypoint = this.waypoints[this.nextWaypointIndex]
    if (!nextWaypoint) return this.clearTargetPath()
    humanoid.MoveTo(nextWaypoint.Position)
  }

  clearTargetPath() {
    this.target = undefined
    this.blockedConnection?.Disconnect()
    this.reachedConnection?.Disconnect()
    this.blockedConnection = undefined
    this.reachedConnection = undefined
    this.nextWaypointIndex = 1
  }
}
