"use client";

import { useState } from "react";
import { useAfterPhysicsStep } from "@react-three/rapier";
import Controller from "ecctrl";

interface PhysicsReadyControllerProps {
  children: React.ReactNode;
  maxVelLimit?: number;
  position?: [number, number, number];
  playerRef?: any;
}

export default function PhysicsReadyController(props: PhysicsReadyControllerProps) {
  const [physicsReady, setPhysicsReady] = useState(false);

  useAfterPhysicsStep(() => {
    if (!physicsReady) {
      setPhysicsReady(true);
    }
  });

  if (!physicsReady) {
    return null;
  }

  return (
    <Controller
      maxVelLimit={props.maxVelLimit ?? 5}
      position={props.position ?? [0, 0.5, 0]}
    >
      {props.children}
    </Controller>
  );
}
