import { Vector3 } from "@react-three/fiber";
import CustomRigidBody from "@/app/modules/shared/components/custom-rigid-body";
import Cartel from "./cartel";
import { ObjectProps } from "@/app/modules/shared/interfaces/object-props";

interface DoorProps {
  labelDoor?: string;
  playerRef?: any;
  detectionRadius?: number;
  onEnterArea?: (isEnter: boolean) => void;
  groupProps?: ObjectProps;
  cartelProps?: ObjectProps;
  doorProps?: ObjectProps;
}

function Door(props: DoorProps) {
  return (
    <group {...props.groupProps}>
      <group rotation={[0, Math.PI, 0]}>
        <group {...props.cartelProps}>
          <Cartel
            label={props.labelDoor ?? "Door"}
            position={[0, 0.65, 0]}
            rotation={[0, Math.PI, 0]}
            scale={0.1}
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
          gltf={{
            ...props.doorProps,
            src: "/objects-3D/commons/door-round.glb",
          }}
        />
      </group>
    </group>
  );
}

export default Door;
