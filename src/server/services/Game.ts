import { Components } from "@flamework/components";
import {Dependency, OnStart, Service } from "@flamework/core";
import { AIController } from "server/components/AI/AIController2";
import { CollisionManager } from "./CollisionManager";

const components = Dependency<Components>();

const PlayerService = game.GetService("Players")
const ServerStorage = game.GetService("ServerStorage")

const CreepsFolder = ServerStorage.WaitForChild("Creeps") as Folder
const Dummy = CreepsFolder.WaitForChild("Dummy") as Model
const Map = game.Workspace.WaitForChild("Map") as Model
const TEMPWAYPOINTS = Map.WaitForChild("Waypoints").GetChildren() as Part[]

const MIN_PLAYERS = 1

@Service()
export class Game implements OnStart {
  constructor(private collisionManager: CollisionManager) {}

  private gameStarted = false  
  private playerCount = 0

  onStart() {
    print("Game.onStart()")
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
    print("Game.startGame()")
    //* testing ai spawn and movement
    while (true) {
      wait(1)
      const ai = Dummy.Clone()
      this.collisionManager.addAI(ai)
      ai.Parent = game.Workspace
      const aiController = components.getComponent<AIController>(ai)
      if (aiController) {
        const waypoints = TEMPWAYPOINTS.map(waypoint => waypoint.Position)
        aiController.waypointList = waypoints
      } else {
        warn("AI controller not found")
      }
    }
  }

    
}