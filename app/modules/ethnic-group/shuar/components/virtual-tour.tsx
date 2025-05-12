"use client";

import { RigidBody } from "@react-three/rapier";
import Door from "./door";
import PlayerControl from "./player-control";
import CanvasEnvironment from "@/app/modules/shared/canvas-environment";

function Box(props: any) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color ?? "lightsteelblue"} />
    </mesh>
  );
}

function VirtualTour() {
  return (
    <CanvasEnvironment>
      <PlayerControl />

      <RigidBody type="fixed" colliders="trimesh">
        <Box position={[0, 0, 0]} scale={[30, 1, 30]} />
      </RigidBody>

      <Door position={[0, 0.5, 10]} rotation={[0, Math.PI, 0]} scale={6} />
      <Door position={[10, 0.5, 5]} rotation={[0, -Math.PI / 2, 0]} scale={6} />
    </CanvasEnvironment>
  );
}

export default VirtualTour;
