import { RigidBody, RigidBodyProps } from "@react-three/rapier";
import { CloneProps, Gltf } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 as V3 } from "three";

interface CustomRigidBodyProps {
  rigidBody: RigidBodyProps;
  gltf: Omit<CloneProps, "object"> & { src: string };
  ref?: React.Ref<any>;
  playerRef?: any;
  detectionRadius?: number;
  onEnterArea?: (isEnter: boolean) => void;
}

function CustomRigidBody(props: CustomRigidBodyProps) {
  const objectRef = useRef<any>(null);
  const [isInsideArea, setIsInsideArea] = useState(false);

  useEffect(() => {
    props.onEnterArea?.(isInsideArea);
  }, [isInsideArea]);

  useFrame(() => {
    if (!objectRef.current || !props.playerRef) return;

    const zoneDoorPos = new V3();
    const zonePlayerPos = new V3();

    const doorPos = (objectRef.current as any).getWorldPosition(zoneDoorPos);
    const playerPos = (props.playerRef.current as any).getWorldPosition(
      zonePlayerPos
    );

    const horizontalDistance = Math.sqrt(
      Math.pow(playerPos.x - doorPos.x, 2) +
        Math.pow(playerPos.z - doorPos.z, 2)
    );
    const radius = props.detectionRadius ?? 1;

    /* console.log({
      horizontalDistance,
      radius,
      isInsideArea: horizontalDistance <= radius,
    }) */

    setIsInsideArea(horizontalDistance <= radius);
  });

  return (
    <RigidBody {...props.rigidBody}>
      <Gltf ref={objectRef} {...props.gltf} />
    </RigidBody>
  );
}

export default CustomRigidBody;
