import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

/** 🗺️ map setup
 * 
 * - turns waypoints invisible
 */
@Component({
  tag: "Map"
})
export class AIController extends BaseComponent implements OnStart {
  onStart(): void {
    print("START")
    const waypointsGroup = this.instance.FindFirstChild("Waypoints")
    if (!waypointsGroup) return
    const waypoints = waypointsGroup.GetChildren()
    waypoints.forEach(waypoint => {
      if (!waypoint.IsA("Part")) return
      waypoint.Transparency = 0
      const children = waypoint.GetChildren()
      children.forEach(child => {
        child.Destroy()
      })
    })
  }
}