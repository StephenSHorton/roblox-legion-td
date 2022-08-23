import { Components } from "@flamework/components";
import {Dependency, OnStart, Service } from "@flamework/core";
import { AIController } from "server/components/AI/AIController";
import { shuffle } from "server/utility";
import { CollisionManager } from "../CollisionManager";
import { initTeamLanes, TeamLanes } from "./Game.types.";

const components = Dependency<Components>();

const PlayerService = game.GetService("Players")
const ServerStorage = game.GetService("ServerStorage")

const CreepsFolder = ServerStorage.WaitForChild("Creeps") as Folder
const Dummy = CreepsFolder.WaitForChild("Dummy") as Model
const Map = game.Workspace.WaitForChild("Map") as Model
const TEMPWAYPOINTS = Map.WaitForChild("Waypoints").GetChildren() as Part[]

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
  private lanes: TeamLanes = initTeamLanes

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
    const players = PlayerService.GetPlayers()
    shuffle(players).forEach((player) => {
      this.assignPlayerToTeam(player)
    })
    print(this.lanes)
  }

  assignPlayerToTeam(player: Player) {
    //! broken, assigns me to every lane
    let foundTeam = false
    for (const [_, v] of pairs(this.lanes)) {
      for (const [_, v2] of pairs(v)) {
        if (!v2.player) {
          v2.player = player
          foundTeam = true
          break
        }
      }
      if (foundTeam) break
    }
  }
}