"use client";

import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

import CanvasEnvironment from "@/app/modules/shared/components/canvas-environment";
import PlayerControl from "../../../shared/components/player-control";

function SectionVirtualTour() {
  const playerRef = useRef<any>(null);

  return (
    <CanvasEnvironment>
      <PlayerControl playerRef={playerRef} />

      <RigidBody type="fixed" colliders="trimesh">
        <Box position={[0, 0, 0]} scale={[30, 0.5, 30]} />
      </RigidBody>
    </CanvasEnvironment>
  );
}

export default SectionVirtualTour;
