import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

/** 🗺️ map setup
 *
 * - turns waypoints invisible
 */
@Component({
	tag: "Map",
})
export class Map extends BaseComponent implements OnStart {
	onStart(): void {
		this.hideWaypoints();
	}

	private hideWaypoints() {
		const waypointsGroup = this.instance.FindFirstChild("Waypoints");
		if (!waypointsGroup) return warn("Map waypoints not found");
		const waypoints = waypointsGroup.GetChildren();
		waypoints
			.filter((waypoint): waypoint is Part => "Transparency" in waypoint)
			.forEach((waypoint) => {
				waypoint.Transparency = 1;
				const children = waypoint.GetChildren();
				children.forEach((child) => {
					child.Destroy();
				});
			});
	}
}
