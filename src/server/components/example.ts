// import { OnStart } from "@flamework/core"
// import { Component, BaseComponent } from "@flamework/components"
// import Make from "@rbxts/make"
// import { t } from "@rbxts/t"
// // import { FusionController, MenuName } from "client/controllers/FusionController"

// interface Attributes {}

// @Component({
//   tag: "ball",
//   instanceGuard: t.instanceIsA("Model"),
// })
// export class ATMComponent extends BaseComponent<Attributes> implements OnStart {
//   // constructor(private readonly fusionController: FusionController) {
//   //   super()
//   // }

//   onStart() {
//     if (!this.instance.IsA("Model")) return
//     const prompt = this.attachProximityPrompt()
//     this.maid.GiveTask(
//       prompt.Triggered.Connect((plr) => {
//         const plrChar = plr.Character
//         if (!plrChar) return
//         this.kick(plrChar.PrimaryPart?.Position)
//         // this.fusionController.openMenu(MenuName.atm)
//       })
//     )
//   }

//   attachProximityPrompt() {
//     return Make("ProximityPrompt", {
//       ObjectText: "Ball",
//       ActionText: "Kick",
//       Parent: this.instance,
//     })
//   }

//   kick(playerLocation: Vector3 | undefined) {
//     if (!this.instance.IsA("BasePart") || !playerLocation) return
//     return Make("LinearVelocity", {
//       LineDirection: new Vector3(0, 1, 0),
//       LineVelocity: 100,
//       Parent: this.instance,
//     })
//   }
// }

export {}