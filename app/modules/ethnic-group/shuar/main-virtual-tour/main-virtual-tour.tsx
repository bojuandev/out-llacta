"use client";

import { RigidBody } from "@react-three/rapier";
import PlayerControl from "../../../shared/components/player-control";
import CanvasEnvironment from "@/app/modules/shared/components/canvas-environment";
import { useRef } from "react";
import { Box } from "@react-three/drei";
import ObjectList from "./components/object-list";

interface MainVirtualTourProps {
  doorDetected?: (door: { name: string; isEnter: boolean }) => void;
}

function MainVirtualTour({ doorDetected }: MainVirtualTourProps) {
  const playerRef = useRef<any>(null);

  const handleEnterArea = (doorName: string) => (isEnter: boolean) => {
    doorDetected?.({
      name: doorName,
      isEnter,
    });
  };
  return (
    <>
      <CanvasEnvironment>
        <PlayerControl playerRef={playerRef} />

        <RigidBody type="fixed" colliders="trimesh">
          <Box position={[0, 0, 0]} scale={[30, 0.5, 30]} />
        </RigidBody>

        <ObjectList playerRef={playerRef} onEnterArea={handleEnterArea} />
      </CanvasEnvironment>
    </>
  );
}

export default MainVirtualTour;
