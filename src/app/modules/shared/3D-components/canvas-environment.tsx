"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment, KeyboardControls } from "@react-three/drei";
import { Vector3 } from "three";
import PlayerController from "@/features/player-movement/player-controller";
import CameraController from "@/features/player-movement/camera-controller";

interface CanvasEnvironmentProps {
  children: React.ReactNode;
  currentAnimation: "Idle" | "Walking";
  onAnimationChange: (name: string, pressed: boolean) => void;
  playerPositionRef?: React.MutableRefObject<Vector3>;
}

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
  { name: "rightward", keys: ["ArrowRight", "KeyD"] },
];

export default function CanvasEnvironment({
  children,
  currentAnimation,
  onAnimationChange,
  playerPositionRef,
}: CanvasEnvironmentProps) {
  const internalPositionRef = useRef(new Vector3(0, 0.75, 0));
  const positionRef = playerPositionRef ?? internalPositionRef;
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

        <Physics timeStep={1/60} gravity={[0, -20, 0]}>
          <PlayerController
            currentAnimation={currentAnimation}
            onAnimationChange={onAnimationChange}
            positionRef={positionRef}
            cameraYawRef={cameraYawRef}
            keysRef={keysRef}
          />
          {children}
        </Physics>
      </KeyboardControls>
    </Canvas>
  );
}
