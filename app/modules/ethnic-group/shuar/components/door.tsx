import CustomRigidBody from "@/app/modules/shared/custom-rigid-body";
import { Vector3 } from "@react-three/fiber";

interface DoorProps {
  position: Vector3;
  rotation: Vector3;
  scale: number;
}

function Door(props: DoorProps) {
  return (
    <CustomRigidBody
      rigidBody={{
        type: "fixed",
        colliders: "trimesh",
      }}
      gltf={{ ...(props as any), src: "/door-round.glb" }}
    />
  );
}

export default Door;
