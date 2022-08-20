import { OnStart, Service } from "@flamework/core"

const PhysicsService = game.GetService("PhysicsService")

const group = {
  AI: 'AI'
}

PhysicsService.CreateCollisionGroup(group.AI)
PhysicsService.CollisionGroupSetCollidable(group.AI, group.AI, false)

@Service()
export class CollisionManager {
  
  addAI(ai: Model) {
    const parts = ai.GetChildren().filter((part): part is BasePart => part.IsA('BasePart'))
    parts.forEach(part => {
      PhysicsService.SetPartCollisionGroup(part, group.AI)
    })
  }
    
}