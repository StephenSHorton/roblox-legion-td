export {};
declare global {
	interface Workspace extends Model {
		Map: Model & {
			PlayerAreas: Model & {
				SouthWest: Part;
				SouthEast: Part;
				NorthWest: Part;
				NorthEast: Part;
			};
			Waypoints: Model & {
				SouthWest: Part;
				SouthEast: Part;
				Center: Part;
				West: Part;
				NorthWest: Part;
				South: Part;
				East: Part;
				NorthEast: Part;
			};
		};
		Camera: Camera;
		Baseplate: Part & {
			Texture: Texture;
		};
		RobloxLegionTDText: Model & {
			R: UnionOperation;
			e: UnionOperation;
			D: UnionOperation;
			g: UnionOperation;
			i: UnionOperation;
			x: UnionOperation;
			T: UnionOperation;
			b: UnionOperation;
			l: UnionOperation;
			L: UnionOperation;
			n: UnionOperation;
		};
		SpawnLocation: SpawnLocation & {
			Decal: Decal;
			Texture: Texture;
		};
	}

	interface ServerStorage extends Instance {
		TagList: Folder & {
			AI: Configuration;
			Map: Configuration;
		};
		Creeps: Folder & {
			Dummy: Model & {
				LeftLowerArm: MeshPart & {
					LeftLowerArm: WrapTarget;
					OriginalSize: Vector3Value;
					LeftElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftElbow: Motor6D;
					LeftWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				LeftFoot: MeshPart & {
					OriginalSize: Vector3Value;
					LeftAnkle: Motor6D;
					LeftFoot: WrapTarget;
					LeftAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftFootAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				RightHand: MeshPart & {
					OriginalSize: Vector3Value;
					RightWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightHand: WrapTarget;
					RightWrist: Motor6D;
					RightGripAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				HumanoidRootPart: Part & {
					RootRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
				};
				KatanasAccessory: Accessory & {
					ThumbnailConfiguration: Configuration & {
						ThumbnailCameraValue: CFrameValue;
						ThumbnailCameraTarget: ObjectValue;
					};
					Handle: MeshPart & {
						WaistCenterAttachment: Attachment;
						OriginalSize: Vector3Value;
						TouchInterest: TouchTransmitter;
						AccessoryWeld: Weld;
						AvatarPartScaleType: StringValue;
					};
				};
				Shirt: Shirt;
				Pants: Pants;
				RightLowerLeg: MeshPart & {
					RightAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					RightKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightLowerLeg: WrapTarget;
					RightKnee: Motor6D;
				};
				LeftUpperLeg: MeshPart & {
					LeftHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftHip: Motor6D;
					OriginalSize: Vector3Value;
					LeftUpperLeg: WrapTarget;
					LeftKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				LeftLowerLeg: MeshPart & {
					LeftKnee: Motor6D;
					OriginalSize: Vector3Value;
					LeftLowerLeg: WrapTarget;
					LeftAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				Noob_Pink: Accessory & {
					ThumbnailConfiguration: Configuration & {
						ThumbnailCameraValue: CFrameValue;
						ThumbnailCameraTarget: ObjectValue;
					};
					Handle: MeshPart & {
						HatAttachment: Attachment;
						OriginalSize: Vector3Value;
						TouchInterest: TouchTransmitter;
						AccessoryWeld: Weld;
						AvatarPartScaleType: StringValue;
					};
				};
				RightUpperArm: MeshPart & {
					OriginalSize: Vector3Value;
					RightElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightShoulder: Motor6D;
					RightShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightShoulderAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightUpperArm: WrapTarget;
				};
				Head: MeshPart & {
					HatAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					Head: WrapTarget;
					FaceFrontAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					face: Decal;
					HairAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					NeckRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					Neck: Motor6D;
					FaceCenterAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				UpperTorso: MeshPart & {
					RightCollarAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					BodyBackAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					NeckRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftCollarAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					Waist: Motor6D;
					UpperTorso: WrapTarget;
					OriginalSize: Vector3Value;
					LeftShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					BodyFrontAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					WaistRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					NeckAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				RightFoot: MeshPart & {
					RightFootAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					RightAnkle: Motor6D;
					RightFoot: WrapTarget;
					RightAnkleRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				LeftUpperArm: MeshPart & {
					LeftShoulderRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					LeftShoulderAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftShoulder: Motor6D;
					LeftUpperArm: WrapTarget;
				};
				RightLowerArm: MeshPart & {
					RightLowerArm: WrapTarget;
					OriginalSize: Vector3Value;
					RightElbowRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightElbow: Motor6D;
				};
				LeftHand: MeshPart & {
					OriginalSize: Vector3Value;
					LeftWrist: Motor6D;
					LeftGripAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftHand: WrapTarget;
					LeftWristRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
				Humanoid: Humanoid & {
					BodyTypeScale: NumberValue;
					HumanoidDescription: HumanoidDescription;
					HeadScale: NumberValue;
					BodyProportionScale: NumberValue;
					Animator: Animator;
					BodyWidthScale: NumberValue;
					BodyDepthScale: NumberValue;
					BodyHeightScale: NumberValue;
				};
				Labmouse: Accessory & {
					Handle: MeshPart & {
						TouchInterest: TouchTransmitter;
						HatAttachment: Attachment;
						OriginalSize: Vector3Value;
						AccessoryWeld: Weld;
					};
				};
				["Body Colors"]: BodyColors;
				RightUpperLeg: MeshPart & {
					OriginalSize: Vector3Value;
					RightHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightKneeRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightUpperLeg: WrapTarget;
					RightHip: Motor6D;
				};
				LowerTorso: MeshPart & {
					WaistCenterAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					LeftHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					Root: Motor6D;
					LowerTorso: WrapTarget;
					RootRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					RightHipRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					OriginalSize: Vector3Value;
					WaistRigAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					WaistBackAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
					WaistFrontAttachment: Attachment & {
						OriginalPosition: Vector3Value;
					};
				};
			};
		};
	}
}
