// import { OnTick } from "@flamework/core"
// import { Component, BaseComponent } from "@flamework/components"
// import Make from "@rbxts/make"

// const PathfindingService = game.GetService("PathfindingService")
// const CollectionService = game.GetService("CollectionService")
// const Debris = game.GetService("Debris")

// type Attributes = {
//   targetTag: string //TODO probably standardize this "Player" | "Enemy" | "Ally" ???
// }

// /** controller for AI
//  * TODO stuttering is occuring. Starting to feel like npc pathfinding aint worth it. Maybe just move them more stupidly? Like go somewhere, if encounter enemy then attack?
//  * !TODO script keeps running even after deleting the AI
//  */
// @Component({
//   tag: "AI",
//   defaults: {
//     targetTag: "Player",
//   },
// })
// export class AIController extends BaseComponent<Attributes> implements OnTick {
//   private target?: Model

//   onTick(): void {
//     //find target
//     if (!this.target) {
//       print("Finding target...")
//       this.findTarget()
//       return
//     }
//   }

//   /** locates the nearest model in workspace with a tag that matches the targetTag attribute
//    * TODO is it better to locate targets by proximity instead of the whole workspace? (might be the same amount of work just scanning the workspace AND by distance)
//    */
//   findTarget() {
//     const Roger111 = game.Workspace.FindFirstChild("Roger111") as Model | undefined
//     if (!Roger111) return
//     print("Found target...")
//     this.target = Roger111
//       this.pursueTarget(Roger111)
//   }

//   private waypoints: PathWaypoint[] = []
//   private nextWaypointIndex = 1
//   private reachedConnection?: RBXScriptConnection
//   private blockedConnection?: RBXScriptConnection

//   pursueTarget(target: Model) {
//     //checks
//     if (!this.instance.IsA("Model")) {
//       throw error("AIController must be attached to a Model")
//     }
//     if (!this.instance.PrimaryPart) {
//       throw error("AIController must be attached to a Model with a PrimaryPart")
//     }
//     const humanoid = this.instance.FindFirstChildOfClass("Humanoid")
//     if (!humanoid) {
//       throw error("AIController must be attached to a Model with a Humanoid")
//     }
//     if (!target.PrimaryPart) return this.clearTargetPath([])

//     //create path
//     const path = PathfindingService.CreatePath({
//       AgentHeight: 4,
//       AgentRadius: 3,
//       AgentCanJump: false,
//     })
//     //compute path
//     const start = this.instance.PrimaryPart.Position
//     const finish = target.PrimaryPart.Position
//     path.ComputeAsync(start, finish)
//     //if not successful path, clear target
//     if (path.Status !== Enum.PathStatus.Success) return this.clearTargetPath([])

//     this.waypoints = path.GetWaypoints()
//     this.waypoints.shift()
//     const drawnPath = this.drawPath(this.waypoints)
//     drawnPath[0].BrickColor = new BrickColor("Really blue")

//     //setup blocked connection
//     this.blockedConnection = path.Blocked.Connect((blockedWaypointIndex) => {
//       //check if the obstacle is further down the path
//       if (blockedWaypointIndex >= this.nextWaypointIndex) {
//         return this.clearTargetPath(drawnPath)
//       }
//     })

//     //detect when movement to next waypoint is complete
//     if (!this.reachedConnection) {
//       this.reachedConnection = humanoid.MoveToFinished.Connect((reached) => {
//         if (reached && this.nextWaypointIndex < this.waypoints.size() - 1) {
//           //increase waypoint index and move to next waypoint
//           drawnPath[this.nextWaypointIndex].Destroy()
//           this.nextWaypointIndex++
//           drawnPath[this.nextWaypointIndex].BrickColor = new BrickColor("Lime green")
//           const nextWaypoint = this.waypoints[this.nextWaypointIndex]
//           if (!nextWaypoint) return this.clearTargetPath(drawnPath)
//           humanoid.MoveTo(nextWaypoint.Position)
//         } else {
//           drawnPath.forEach(part => part.Destroy())
//           return this.clearTargetPath(drawnPath)
//         }
//       })
//     }

//     if (this.waypoints.size() === 0) return this.clearTargetPath(drawnPath)
//     const nextWaypoint = this.waypoints[this.nextWaypointIndex]
//     if (!nextWaypoint) return this.clearTargetPath(drawnPath)
//     humanoid.MoveTo(nextWaypoint.Position)
//   }

//   clearTargetPath(drawnPath: Part[]) {
//     print("Clearing target path...")
//     drawnPath.forEach(part => part.Destroy())
//     this.target = undefined
//     this.blockedConnection?.Disconnect()
//     this.reachedConnection?.Disconnect()
//     this.blockedConnection = undefined
//     this.reachedConnection = undefined
//     this.nextWaypointIndex = 1
//   }

//   drawPath(waypoints: PathWaypoint[]) {
//     const drawnPath: Part[] = []
//     waypoints.forEach((wp, index) => {
//       drawnPath.push(Make("Part", {
//         Name: `Waypoint-${index}`,
//         Parent: game.Workspace,
//         Anchored: true,
//         CanCollide: false,
//         Size: new Vector3(1, 1, 1),
//         Shape: Enum.PartType.Ball,
//         CFrame: new CFrame(wp.Position),
//         Material: Enum.Material.Glass,
//         BrickColor: new BrickColor("Really red"),
//       }))
//     })
//     return drawnPath
//   }
// }
export {}