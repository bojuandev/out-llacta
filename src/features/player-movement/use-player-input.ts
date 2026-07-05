"use client";

import { useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { Vector3 } from "three";

export interface PlayerInput {
  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
  direction: Vector3;
}

export function usePlayerInput(): PlayerInput {
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls();

  const { forward, backward, leftward, rightward } = getKeys();

  const cameraDirection = new Vector3();
  camera.getWorldDirection(cameraDirection);
  cameraDirection.y = 0;
  cameraDirection.normalize();

  const rightDirection = new Vector3();
  rightDirection.crossVectors(cameraDirection, new Vector3(0, 1, 0)).normalize();

  const direction = new Vector3();

  if (forward) direction.add(cameraDirection);
  if (backward) direction.sub(cameraDirection);
  if (leftward) direction.sub(rightDirection);
  if (rightward) direction.add(rightDirection);

  if (direction.length() > 0) {
    direction.normalize();
  }

  return {
    forward,
    backward,
    leftward,
    rightward,
    direction,
  };
}
