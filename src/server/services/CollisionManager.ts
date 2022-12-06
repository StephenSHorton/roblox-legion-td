import { OnStart, Service } from "@flamework/core";

const PhysicsService = game.GetService("PhysicsService");

const group = {
	NPC: "NPC",
};

PhysicsService.CreateCollisionGroup(group.NPC);
PhysicsService.CollisionGroupSetCollidable(group.NPC, group.NPC, false);

@Service()
export class CollisionManager {
	addNPC(npc: Model) {
		const parts = npc.GetChildren().filter((part): part is BasePart => part.IsA("BasePart"));
		parts.forEach((part) => {
			PhysicsService.SetPartCollisionGroup(part, group.NPC);
		});
	}
}
