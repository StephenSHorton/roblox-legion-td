import { BaseComponent, Component } from "@flamework/components";
import { OnStart, OnTick } from "@flamework/core";
import Make from "@rbxts/make";

const SCRIPT_TAG = "<NPC Attacker Controller>";
const COMPONENT_TAG = "NPC_Attacker";

const PathfindingService = game.GetService("PathfindingService");

@Component({
	tag: COMPONENT_TAG,
})
export class Controller extends BaseComponent implements OnTick, OnStart {
	public WaypointList?: Vector3[];

	private currentWaypointIndex = -1;
	private isPathing = false;
	private reachedConnection?: RBXScriptConnection;
	private blockedConnection?: RBXScriptConnection;

	onStart() {
		this.validateInstance();
	}

	onTick(): void {
		if (this.isPathing) return;
		if (this.WaypointList) {
			this.initPathing(this.WaypointList);
		}
	}

	/** verifies that the attached instance is valid */
	private validateInstance() {
		if (!this.instance.IsA("Model")) {
			throw error(`${SCRIPT_TAG} must be attached to a Model`);
		}
		if (!this.instance.PrimaryPart) {
			throw error(`${SCRIPT_TAG} must be attached to a Model with a PrimaryPart`);
		}
		const humanoid = this.instance.FindFirstChildOfClass("Humanoid");
		if (!humanoid) {
			throw error(`${SCRIPT_TAG} must be attached to a Model with a Humanoid`);
		}
	}

	private initPathing(waypoints: Vector3[]) {
		this.isPathing = true;
		print("init pathing");
		print(waypoints);
		this.currentWaypointIndex += 1;
		if (this.currentWaypointIndex > waypoints.size() - 1) {
			this.WaypointList = undefined;
			return;
		}
		this.pathTo(waypoints[this.currentWaypointIndex]);
	}

	pathTo(goal: Vector3) {
		//* instance narrowing
		if (!this.instance.IsA("Model")) return;
		if (!this.instance.PrimaryPart) return;
		const humanoid = this.instance.FindFirstChildOfClass("Humanoid");
		if (!humanoid) return;
		this.isPathing = true;

		//* create path
		const path = PathfindingService.CreatePath({
			AgentHeight: 4,
			AgentRadius: 3,
			AgentCanJump: false,
		});

		//* compute path
		path.ComputeAsync(this.instance.PrimaryPart.Position, goal);
		//if not successful path, clear target
		if (path.Status !== Enum.PathStatus.Success) return this.clearTargetPath([], humanoid);
		let nextWaypointIndex = 1;
		const waypoints = path.GetWaypoints();
		waypoints.shift();
		const drawnPath = this.drawPath(waypoints);
		drawnPath[0].BrickColor = new BrickColor("Really blue");

		//* setup blocked connection
		if (this.blockedConnection) {
			this.blockedConnection.Disconnect();
			this.blockedConnection = undefined;
		}
		this.blockedConnection = path.Blocked.Connect((blockedWaypointIndex) => {
			//check if the obstacle is further down the path
			if (blockedWaypointIndex >= nextWaypointIndex) {
				return this.clearTargetPath(drawnPath, humanoid);
			}
		});

		//* detect when movement to next waypoint is complete
		if (this.reachedConnection) {
			this.reachedConnection.Disconnect();
			this.reachedConnection = undefined;
			humanoid.MoveTo(this.instance.PrimaryPart.Position);
			wait(0.1);
		}
		this.reachedConnection = humanoid.MoveToFinished.Connect((reached) => {
			if (reached && nextWaypointIndex < waypoints.size() - 1) {
				//increase waypoint index and move to next waypoint
				drawnPath[nextWaypointIndex].Destroy();
				nextWaypointIndex++;
				drawnPath[nextWaypointIndex].BrickColor = new BrickColor("Lime green");
				const nextWaypoint = waypoints[nextWaypointIndex];
				if (!nextWaypoint) return this.clearTargetPath(drawnPath, humanoid);
				humanoid.MoveTo(nextWaypoint.Position);
			} else {
				return this.clearTargetPath(drawnPath, humanoid);
			}
		});

		if (waypoints.size() === 0) return this.clearTargetPath(drawnPath, humanoid);
		const nextWaypoint = waypoints[nextWaypointIndex];
		if (!nextWaypoint) return this.clearTargetPath(drawnPath, humanoid);
		humanoid.MoveTo(nextWaypoint.Position);
	}

	clearTargetPath(drawnPath: Part[], humanoid: Humanoid) {
		drawnPath.forEach((part) => part.Destroy());
		this.blockedConnection?.Disconnect();
		this.reachedConnection?.Disconnect();
		this.blockedConnection = undefined;
		this.reachedConnection = undefined;
		this.isPathing = false;
	}

	drawPath(waypoints: PathWaypoint[]) {
		const drawnPath: Part[] = [];
		waypoints.forEach((wp, index) => {
			drawnPath.push(
				Make("Part", {
					Name: `Waypoint-${index}`,
					Parent: game.Workspace,
					Anchored: true,
					CanCollide: false,
					Size: new Vector3(1, 1, 1),
					Shape: Enum.PartType.Ball,
					CFrame: new CFrame(wp.Position),
					Material: Enum.Material.Glass,
					BrickColor: new BrickColor("Really red"),
				}),
			);
		});
		return drawnPath;
	}
}
