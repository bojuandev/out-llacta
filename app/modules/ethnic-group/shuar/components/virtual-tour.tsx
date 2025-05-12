"use client";

import { RigidBody } from "@react-three/rapier";
import Door from "./door";
import PlayerControl from "./player-control";
import CanvasEnvironment from "@/app/modules/shared/canvas-environment";
import { useRef } from "react";
import Cartel from "./cartel";

interface VirtualTourProps {
  doorDetected?: (door: { name: string; isEnter: boolean }) => void;
}

function Box(props: any) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color ?? "lightsteelblue"} />
    </mesh>
  );
}

function VirtualTour({ doorDetected }: VirtualTourProps) {
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

        <Door
          labelDoor="Puerta 1"
          playerRef={playerRef}
          position={[0, 0.3, 10]}
          rotation={[0, Math.PI, 0]}
          scale={6}
          onEnterArea={handleEnterArea("Puerta 1")}
        />
        <Door
          labelDoor="Puerta 2"
          playerRef={playerRef}
          position={[10, 0.5, 5]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={6}
          onEnterArea={handleEnterArea("Puerta 2")}
        />
        <Door
          labelDoor="Puerta 3"
          playerRef={playerRef}
          position={[-10, 0.5, 5]}
          rotation={[0, Math.PI / 2, 0]}
          scale={6}
          onEnterArea={handleEnterArea("Puerta 3")}
        />
      </CanvasEnvironment>
    </>
  );
}

export default VirtualTour;
