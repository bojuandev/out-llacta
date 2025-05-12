import { RigidBody, RigidBodyProps } from "@react-three/rapier";
import { CloneProps, Gltf } from "@react-three/drei";

interface CustomRigidBodyProps {
  rigidBody: RigidBodyProps;
  gltf: Omit<CloneProps, "object"> & {src: string}
}

function CustomRigidBody(props: CustomRigidBodyProps) {
  return (
    <RigidBody {...props.rigidBody}>
      <Gltf {...props.gltf} />
    </RigidBody>
  );
}

export default CustomRigidBody;
