import { Vector3 } from "@react-three/fiber";
import CustomRigidBody from "@/app/modules/shared/custom-rigid-body";
import Cartel from "./cartel";

interface DoorProps {
  labelDoor?: string;
  position: Vector3;
  rotation: Vector3;
  scale: number;
  playerRef?: any;
  detectionRadius?: number;
  onEnterArea?: (isEnter: boolean) => void;
}

function Door(props: DoorProps) {
  return (
    <group>
      <group position={props.position} rotation={props.rotation as any}>
        <Cartel
          label={props.labelDoor ?? "Door"}
          position={[0, 4, 0]}
          rotation={[0, Math.PI, 0]}
        />
      </group>
      <CustomRigidBody
        playerRef={props.playerRef}
        detectionRadius={props.detectionRadius}
        onEnterArea={props.onEnterArea}
        rigidBody={{
          type: "fixed",
          colliders: "trimesh",
        }}
        gltf={{ ...(props as any), src: "/door-round.glb" }}
      />
    </group>
  );
}

export default Door;
