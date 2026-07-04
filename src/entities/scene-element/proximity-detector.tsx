"use client"

import { RigidBody } from "@react-three/rapier";
import { CloneProps, Gltf } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 as V3 } from "three";
import { ProximityDetectorProps } from "./types";

interface ProximityDetectorExtProps extends ProximityDetectorProps {
  gltf?: Omit<CloneProps, "object"> & { src: string };
}

function ProximityDetector(props: ProximityDetectorExtProps) {
  const objectRef = useRef<any>(null);
  const [isInsideArea, setIsInsideArea] = useState(false);

  useEffect(() => {
    props.onEnterArea?.(isInsideArea);
  }, [isInsideArea]);

  useFrame(() => {
    if (!objectRef.current || !props.playerRef) return;

    const playerRefValue = props.playerRef && "current" in props.playerRef
      ? props.playerRef.current
      : props.playerRef;
    if (!playerRefValue) return;

    const zoneDoorPos = new V3();
    const zonePlayerPos = new V3();

    const doorPos = (objectRef.current as any).getWorldPosition(zoneDoorPos);
    const playerPos = (playerRefValue as any).getWorldPosition(
      zonePlayerPos
    );

    const horizontalDistance = Math.sqrt(
      Math.pow(playerPos.x - doorPos.x, 2) +
        Math.pow(playerPos.z - doorPos.z, 2)
    );
    const radius = props.detectionRadius ?? 1;

    setIsInsideArea(horizontalDistance <= radius);
  });

  if (!props.gltf) return null;

  return (
    <RigidBody position={props.position}>
      <Gltf ref={objectRef} {...props.gltf} />
    </RigidBody>
  );
}

export default ProximityDetector;
