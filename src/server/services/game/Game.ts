import { Components } from '@flamework/components'
import { Dependency, OnStart, Service } from '@flamework/core'
import { AIController } from 'server/components/AI/AIController'
import { shuffle } from 'server/utility'
import { CollisionManager } from '../CollisionManager'
import { initTeamLanes, TeamLanes } from './Game.types'

const components = Dependency<Components>()

const PlayerService = game.GetService('Players')
const ServerStorage = game.GetService('ServerStorage')

const Dummy = ServerStorage.Creeps.Dummy
const TEMPWAYPOINTS = game.Workspace.Map.Waypoints

const MIN_PLAYERS = 1

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

	private gameStarted = false
	private playerCount = 0
	private lanes: TeamLanes = { ...initTeamLanes }

	onStart() {
		PlayerService.PlayerAdded.Connect(() => {
			this.playerCount++
			if (!this.gameStarted && this.playerCount >= MIN_PLAYERS) {
				this.gameStarted = true
				this.startGame()
			}
		})
		PlayerService.PlayerRemoving.Connect(() => {
			this.playerCount--
		})
	}

	startGame() {
		//* testing ai spawn and movement
		// while (true) {
		//   wait(1)
		//   const ai = Dummy.Clone()
		//   this.collisionManager.addAI(ai)
		//   ai.Parent = game.Workspace
		//   const aiController = components.getComponent<AIController>(ai)
		//   if (aiController) {
		//     const waypoints = TEMPWAYPOINTS.map(waypoint => waypoint.Position)
		//     aiController.waypointList = waypoints
		//   } else {
		//     warn("AI controller not found")
		//   }
		// }
		this.waitForPlayers(MIN_PLAYERS)
		this.setupPlayers()
	}

	waitForPlayers(minPlayers: number) {
		while (this.playerCount < minPlayers) {
			wait(1)
		}
	}

	setupPlayers() {
		const players = shuffle(PlayerService.GetPlayers())
		players.forEach((player, index) => {
			this.assignPlayerToTeam(player, index)
		})
		print(this.lanes)
		//teleport players to spawn points
		for (const [, v] of pairs(this.lanes)) {
			for (const [lane, v2] of pairs(v)) {
				const player = v2.player
				if (player) {
					const character = player.Character || player.CharacterAdded.Wait()[0]
					print('preparing player ' + character.Name)
					character.PivotTo(new CFrame(game.Workspace.Map.PlayerAreas[lane].Position))
				}
			}
		}
	}

	assignPlayerToTeam(player: Player, index: number) {
		const side = index + (1 % 2) === 0 ? 'East' : 'West'
		for (const [, laneInfo] of pairs(this.lanes[side])) {
			if (!laneInfo.player) {
				laneInfo.player = player
				return
			}
		}
	}
}
