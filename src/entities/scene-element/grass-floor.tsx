"use client"

import { SceneElementProps } from "./types";

function GrassFloor(props: SceneElementProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow {...props}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#4CAF50" />
    </mesh>
  );
}

export default GrassFloor;
