import { Gltf } from "@react-three/drei";
import CustomRigidBody from "@/app/modules/shared/components/custom-rigid-body";
import Cartel from "../../ethnic-group/shuar/main-virtual-tour/components/cartel";
import { ObjectProps } from "../interfaces/object-props";


interface ObjectWithBaseProps {
  srcObject: string;
  labelObject: string;
  groupProps?: ObjectProps;
  objectProps?: ObjectProps;
  baseProps?: ObjectProps;
  playerRef?: any;
  detectionRadius?: number;
  onEnterArea?: (isEnter: boolean) => void;
}

function ObjectWithBase(props: ObjectWithBaseProps) {
  return (
    <group
      position={props.groupProps?.position}
      rotation={props.groupProps?.rotation}
      scale={props.groupProps?.scale}
    >
      <group
        position={props.objectProps?.position}
        rotation={props.objectProps?.rotation}
        scale={props.objectProps?.scale}
      >
        <Gltf position={[0, 2.5, 1]} scale={0.7} src={props.srcObject} />
      </group>
      <group
        position={props.baseProps?.position}
        rotation={props.baseProps?.rotation}
        scale={props.baseProps?.scale}
      >
        <Cartel
          label={props.labelObject}
          position={[0, 1.5, -0.8]}
          rotation={[0, 0, 0]}
          scale={0.8}
        />

        <CustomRigidBody
          playerRef={props.playerRef}
          detectionRadius={props.detectionRadius}
          onEnterArea={props.onEnterArea}
          rigidBody={{
            type: "fixed",
            colliders: "trimesh",
            position: [0, 0, 0],
          }}
          gltf={{
            scale: 7,
            position: [-1.85, 0.3, 0],
            src: "/objects-3D/commons/table-coffee-square.glb",
          }}
        />
      </group>
    </group>
  );
}

export default ObjectWithBase;
