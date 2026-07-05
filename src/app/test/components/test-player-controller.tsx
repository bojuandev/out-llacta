"use client";

import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { Vector3, Quaternion, Euler } from "three";
import Player from "@/app/modules/shared/3D-components/player";

export interface TestPlayerControllerRef {
  getData: () => {
    robotRbPos: { x: number; y: number; z: number };
    robotMeshOffset: { x: number; y: number; z: number };
    robotMeshWorld: { x: number; y: number; z: number };
    capsuleBottom: number;
    floorColliderY: number;
    floorColliderHalfHeight: number;
    floorTop: number;
    penetration: number;
    keys: { w: boolean; a: boolean; s: boolean; d: boolean };
  };
}

interface TestPlayerControllerProps {
  cameraYawRef: React.MutableRefObject<number>;
  positionRef: React.MutableRefObject<Vector3>;
  meshOffsetY: number;
}

const SPEED = 5;
const ROTATION_SMOOTHNESS = 0.15;

const TestPlayerController = forwardRef<TestPlayerControllerRef, TestPlayerControllerProps>(
  function TestPlayerController({ cameraYawRef, positionRef, meshOffsetY }, ref) {
    const rigidBodyRef = useRef<any>(null);
    const meshRef = useRef<any>(null);
    const isMovingRef = useRef(false);
    const [isReady, setIsReady] = useState(true);
    const [currentAnimation, setCurrentAnimation] = useState<"Idle" | "Walking">("Idle");

    // Keyboard controls via drei hook
    const [subscribeKeys, getKeys] = useKeyboardControls();

    // Constants
    const RB_Y = 0.75;
    const CAPSULE_RADIUS = 0.5;
    const CAPSULE_HALFHEIGHT = 0.25;
    const FLOOR_COLLIDER_Y = -0.1;
    const FLOOR_HALFHEIGHT = 0.1;

    // Floor top surface
    const floorTop = FLOOR_COLLIDER_Y + FLOOR_HALFHEIGHT;

    // Debug: no teleport delay, robot visible from start
    useEffect(() => {
      // Log initial position for debugging
      console.log('[TestPlayer] Initial setup - visible from start');
    }, []);

    useImperativeHandle(ref, () => ({
      getData: () => {
        const rbPos = rigidBodyRef.current
          ? rigidBodyRef.current.translation()
          : { x: 0, y: RB_Y, z: 0 };

        const meshWorldY = rbPos.y + meshOffsetY;
        const capsuleBottom = rbPos.y - CAPSULE_HALFHEIGHT - CAPSULE_RADIUS;
        const penetration = Math.max(0, floorTop - capsuleBottom);

        return {
          robotRbPos: { x: rbPos.x, y: rbPos.y, z: rbPos.z },
          robotMeshOffset: { x: 0, y: meshOffsetY, z: 0 },
          robotMeshWorld: { x: rbPos.x, y: meshWorldY, z: rbPos.z },
          capsuleBottom,
          floorColliderY: FLOOR_COLLIDER_Y,
          floorColliderHalfHeight: FLOOR_HALFHEIGHT,
          floorTop,
          penetration,
          keys: {
            w: getKeys().forward,
            a: getKeys().leftward,
            s: getKeys().backward,
            d: getKeys().rightward,
          },
        };
      },
    }));

    useFrame(() => {
      const { forward, backward, leftward, rightward } = getKeys();

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
          setCurrentAnimation("Walking");
        } else {
          setCurrentAnimation("Idle");
        }
      }

      if (rigidBodyRef.current) {
        const currentVel = rigidBodyRef.current.linvel();
        const targetVelocity = {
          x: direction.x * SPEED,
          y: currentVel.y,
          z: direction.z * SPEED,
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
        position={[0, RB_Y, 0]}
      >
        <CapsuleCollider args={[CAPSULE_RADIUS, CAPSULE_HALFHEIGHT]} />
        <Player
          ref={meshRef}
          currentAnimation={currentAnimation}
          scale={0.3}
          position={[0, meshOffsetY, 0]}
          visible={isReady}
        />
      </RigidBody>
    );
  }
);

export default TestPlayerController;
