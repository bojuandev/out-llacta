"use client";

import { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { Vector3, Quaternion, Euler } from "three";
import Player from "@/app/modules/shared/3D-components/player";

interface PlayerControllerProps {
  currentAnimation: "Idle" | "Walking";
  onAnimationChange: (name: string, pressed: boolean) => void;
  positionRef: React.MutableRefObject<Vector3>;
  cameraYawRef: React.MutableRefObject<number>;
  keysRef: React.MutableRefObject<{
    forward: boolean;
    backward: boolean;
    leftward: boolean;
    rightward: boolean;
  }>;
  speed?: number;
}

const SPEED = 5;
const ROTATION_SMOOTHNESS = 0.15;

export default function PlayerController({
  currentAnimation,
  onAnimationChange,
  positionRef,
  cameraYawRef,
  keysRef,
  speed = SPEED,
}: PlayerControllerProps) {
  const rigidBodyRef = useRef<any>(null);
  const meshRef = useRef<any>(null);
  const isMovingRef = useRef(false);

  useFrame(() => {
    const { forward, backward, leftward, rightward } = keysRef.current;

    const cameraAngle = cameraYawRef.current;
    const cameraDirX = Math.sin(cameraAngle);
    const cameraDirZ = Math.cos(cameraAngle);

    const direction = new Vector3();
    if (forward) {
      direction.x -= cameraDirX;
      direction.z -= cameraDirZ;
    }
    if (backward) {
      direction.x += cameraDirX;
      direction.z += cameraDirZ;
    }
    if (leftward) {
      direction.x -= cameraDirZ;
      direction.z += cameraDirX;
    }
    if (rightward) {
      direction.x += cameraDirZ;
      direction.z -= cameraDirX;
    }

    const isMoving = direction.length() > 0;

    if (isMoving !== isMovingRef.current) {
      isMovingRef.current = isMoving;
      if (isMoving) {
        const pressedKey = forward
          ? "forward"
          : backward
            ? "backward"
            : leftward
              ? "leftward"
              : "rightward";
        onAnimationChange(pressedKey, true);
      } else {
        onAnimationChange("forward", false);
      }
    }

    if (rigidBodyRef.current) {
      const currentVel = rigidBodyRef.current.linvel();
      const targetVelocity = {
        x: direction.x * speed,
        y: currentVel.y,
        z: direction.z * speed,
      };
      rigidBodyRef.current.setLinvel(targetVelocity, true);

      const pos = rigidBodyRef.current.translation();
      positionRef.current.set(pos.x, pos.y, pos.z);
    }

    if (isMoving && meshRef.current) {
      const angle = Math.atan2(direction.x, direction.z);
      const targetQuaternion = new Quaternion().setFromEuler(
        new Euler(0, angle, 0)
      );
      meshRef.current.quaternion.slerp(targetQuaternion, ROTATION_SMOOTHNESS);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      colliders={false}
      ccd={true}
      lockRotations={true}
      mass={1}
      position={[0, 0.75, 0]}
    >
      <CapsuleCollider args={[0.5, 0.25]} />
      <Player
        ref={meshRef}
        currentAnimation={currentAnimation}
        scale={0.3}
        position={[0, -0.35, 0]}
      />
    </RigidBody>
  );
}
