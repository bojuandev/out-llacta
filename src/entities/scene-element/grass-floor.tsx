"use client"

import { RigidBody } from "@react-three/rapier";
import { Gltf } from "@react-three/drei";
import { SceneElementProps } from "./types";

function GrassFloor(props: SceneElementProps) {
  return (
    <RigidBody type="fixed" colliders="cuboid" {...props}>
      <Gltf src="/objects-3D/commons/grass-tile.glb" />
    </RigidBody>
  );
}

export default GrassFloor;
