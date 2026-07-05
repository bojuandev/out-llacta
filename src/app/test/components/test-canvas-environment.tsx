"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Environment, KeyboardControls } from "@react-three/drei";
import { Vector3 } from "three";
import PlayerController from "@/features/player-movement/player-controller";
import CameraController from "@/features/player-movement/camera-controller";
import GrassFloor from "@/entities/scene-element/grass-floor";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
];

interface TestCanvasEnvironmentProps {
  children: React.ReactNode;
  onAnimationChange?: (name: string, pressed: boolean) => void;
  onDebugData?: (data: any) => void;
}

export default function TestCanvasEnvironment({
  children,
  onAnimationChange,
  onDebugData,
}: TestCanvasEnvironmentProps) {
  const positionRef = useRef(new Vector3(0, 0.75, 0));
  const cameraYawRef = useRef(Math.PI);
  const cameraPitchRef = useRef(0);
  const keysRef = useRef({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
  });

  const handleKeyChange = (name: string, pressed: boolean) => {
    if (name === "forward") keysRef.current.forward = pressed;
    if (name === "backward") keysRef.current.backward = pressed;
    if (name === "leftward") keysRef.current.leftward = pressed;
    if (name === "rightward") keysRef.current.rightward = pressed;
    onAnimationChange?.(name, pressed);
  };

  return (
    <Canvas shadows camera={{ fov: 50 }}>
      <KeyboardControls map={keyboardMap} onChange={handleKeyChange}>
        <Environment
          files="/assets-3D/je_gray_02_1k.hdr"
          ground={{ scale: 100 }}
        />
        <ambientLight intensity={1} />
        <directionalLight
          intensity={0.1}
          castShadow
          shadow-bias={-0.0004}
          position={[-20, 20, 20]}
        >
          <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
        </directionalLight>

        <CameraController
          targetPosition={positionRef}
          cameraYawRef={cameraYawRef}
          cameraPitchRef={cameraPitchRef}
        />

        <Physics timeStep={1 / 60} gravity={[0, -20, 0]}>
          {/* Ground plane collider */}
          <RigidBody type="fixed" position={[0, -0.1, 0]}>
            <CuboidCollider args={[100, 0.1, 100]} />
          </RigidBody>

            {/* Visual grass floor */}
            <GrassFloor />

          {/* Player */}
          <PlayerController
            currentAnimation="Idle"
            onAnimationChange={handleKeyChange}
            positionRef={positionRef}
            cameraYawRef={cameraYawRef}
            keysRef={keysRef}
          />
        </Physics>
      </KeyboardControls>
    </Canvas>
  );
}
