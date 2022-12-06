import { Components } from "@flamework/components";
import { Dependency, OnStart, Service } from "@flamework/core";
import { Controller as NPCAttackerController } from "server/components/NPC/Attacker/Controller";
import { shuffle } from "server/utility";
import { CollisionManager } from "../CollisionManager";
import { initTeamLanes, TeamLanes } from "./Game.types";

const components = Dependency<Components>();

const PlayerService = game.GetService("Players");
const ServerStorage = game.GetService("ServerStorage");

const Dummy = ServerStorage.Creeps.Dummy;
const MapWaypoints = game.Workspace.Map.Waypoints;

const WestWayPoints = [MapWaypoints.West.Position, MapWaypoints.Center.Position, MapWaypoints.South.Position];
const EastWayPoints = [MapWaypoints.East.Position, MapWaypoints.Center.Position, MapWaypoints.South.Position];
const spawnPoints = [
	[MapWaypoints.NorthWest, [...WestWayPoints]],
	[MapWaypoints.SouthWest, [...WestWayPoints]],
	[MapWaypoints.NorthEast, [...EastWayPoints]],
	[MapWaypoints.SouthEast, [...EastWayPoints]],
] as const;

const MIN_PLAYERS = 0;
/** number of rows per wave */
const ROW_COUNT = 2;
/** interval between row spawns during a wave */
const ROW_INTERVAL = 1;

/** Game encompasses the main loop
 *
 * Loop:
 * 1) Check if there are enough players to start the game, otherwise wait for more players
 * 2) If there are enough players, start the game
 * 3) Assign players to teams/lanes
 * 4) Spawn players
 * 6) wait 45 seconds for players to setup their first units
 * 7) start the wave loop
 * 8) wait for win condition
 * 9) end game
 *
 */
@Service()
export class Game implements OnStart {
	constructor(private collisionManager: CollisionManager) {}

	private gameStarted = false;
	private playerCount = 0;
	private lanes: TeamLanes = { ...initTeamLanes };

	onStart() {
		PlayerService.PlayerAdded.Connect(() => {
			this.playerCount++;
		});
		PlayerService.PlayerRemoving.Connect(() => {
			this.playerCount--;
		});
		this.initGame();
	}

	initGame() {
		this.waitForPlayers(MIN_PLAYERS);
		this.setupPlayers();
		this.testWaveSpawn();
	}

	waitForPlayers(minPlayers: number) {
		while (this.playerCount < minPlayers) {
			wait(1);
		}
	}

	setupPlayers() {
		const players = shuffle(PlayerService.GetPlayers());
		players.forEach((player, index) => {
			this.assignPlayerToTeam(player, index);
		});
		print(this.lanes);
		//teleport players to spawn points
		for (const [, v] of pairs(this.lanes)) {
			for (const [lane, v2] of pairs(v)) {
				const player = v2.player;
				if (player) {
					const character = player.Character || player.CharacterAdded.Wait()[0];
					print("preparing player " + character.Name);
					character.PivotTo(new CFrame(game.Workspace.Map.PlayerAreas[lane].Position));
				}
			}
		}
	}

	assignPlayerToTeam(player: Player, index: number) {
		const side = index + (1 % 2) === 0 ? "East" : "West";
		for (const [, laneInfo] of pairs(this.lanes[side])) {
			if (!laneInfo.player) {
				laneInfo.player = player;
				return;
			}
		}
	}

	testWaveSpawn() {
		print("Initiating wave spawn");
		wait(2);

		//* North West Spawn
		for (let i = 0; i < ROW_COUNT; i++) {
			wait(ROW_INTERVAL);
			spawnPoints.forEach((spawnPoint) => {
				spawn(() => {
					const wave = [];
					for (let index = 1; index < 7; index++) {
						const npc = Dummy.Clone();
						let npcSize = 0;
						if (npc.PrimaryPart) {
							npcSize = npc.PrimaryPart.Size.Y;
						}
						this.collisionManager.addNPC(npc);
						npc.PivotTo(
							new CFrame(
								new Vector3(
									spawnPoint[0].Position.X,
									spawnPoint[0].Position.Y + npcSize * 2,
									spawnPoint[0].Position.Z - spawnPoint[0].Size.Z / 2 + index * 4,
								),
							),
						);
						npc.Parent = game.Workspace;
						wave.push(npc);
					}
					wave.forEach((npc) => {
						const controller = components.getComponent<NPCAttackerController>(npc);
						if (controller) {
							const primaryPart = npc.PrimaryPart;
							if (!primaryPart) return;
							const modifiedWayPoints = [...spawnPoint[1]];
							modifiedWayPoints[0] = new Vector3(
								modifiedWayPoints[0].X,
								modifiedWayPoints[0].Y,
								primaryPart.Position.Z,
							);
							controller.WaypointList = modifiedWayPoints;
						} else {
							warn(`NPC Controller not found`);
						}
					});
				});
			});
		}
	}
}
