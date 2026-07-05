"use client";

import { useCallback } from "react";
import JoystickMovement from "@/features/player-movement/joystick";
import TouchRotation from "@/features/camera-follow/touch-rotation";

interface MobileControlsProps {
  keysRef: React.MutableRefObject<{
    forward: boolean;
    backward: boolean;
    leftward: boolean;
    rightward: boolean;
  }>;
  cameraYawRef: React.MutableRefObject<number>;
  cameraPitchRef: React.MutableRefObject<number>;
  onAnimationChange: (name: string, pressed: boolean) => void;
}

export default function MobileControls({
  keysRef,
  cameraYawRef,
  cameraPitchRef,
  onAnimationChange,
}: MobileControlsProps) {
  const handleJoystickMove = useCallback(
    (direction: { x: number; y: number }) => {
      // Normalize and set thresholds
      const threshold = 0.3;
      
      keysRef.current.forward = direction.y < -threshold;
      keysRef.current.backward = direction.y > threshold;
      keysRef.current.leftward = direction.x < -threshold;
      keysRef.current.rightward = direction.x > threshold;

      // Check if any movement key is pressed
      const isMoving = keysRef.current.forward || keysRef.current.backward || 
                       keysRef.current.leftward || keysRef.current.rightward;
      
      if (isMoving) {
        onAnimationChange("forward", true);
      }
    },
    [keysRef, onAnimationChange]
  );

  const handleJoystickEnd = useCallback(() => {
    keysRef.current.forward = false;
    keysRef.current.backward = false;
    keysRef.current.leftward = false;
    keysRef.current.rightward = false;
    onAnimationChange("forward", false);
  }, [keysRef, onAnimationChange]);

  const handleTouchRotate = useCallback(
    (delta: { x: number; y: number }) => {
      const sensitivity = 0.005;
      cameraYawRef.current -= delta.x * sensitivity;
      cameraPitchRef.current -= delta.y * sensitivity;
      
      // Clamp pitch like in CameraController
      const MIN_PITCH = -Math.PI / 6;
      const MAX_PITCH = Math.PI / 6;
      cameraPitchRef.current = Math.max(
        MIN_PITCH,
        Math.min(MAX_PITCH, cameraPitchRef.current)
      );
    },
    [cameraYawRef, cameraPitchRef]
  );

  return (
    <>
      <JoystickMovement onMove={handleJoystickMove} onMoveEnd={handleJoystickEnd} />
      <TouchRotation onRotate={handleTouchRotate} />
    </>
  );
}
