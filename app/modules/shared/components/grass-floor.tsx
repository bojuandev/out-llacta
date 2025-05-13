import { RigidBody } from "@react-three/rapier";
import { Gltf } from "@react-three/drei";
import { ObjectProps } from "../interfaces/object-props";

function GrassFloor(props: ObjectProps) {
  return (
    <RigidBody type="fixed" colliders="trimesh" {...props}>
      <Gltf src="/objects-3D/commons/grass-tile.glb" />
    </RigidBody>
  );
}

export default GrassFloor;
