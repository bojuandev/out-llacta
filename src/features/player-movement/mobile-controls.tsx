"use client";

import { useState, useCallback } from "react";

interface MobileControlsProps {
  keysRef: React.MutableRefObject<{
    forward: boolean;
    backward: boolean;
    leftward: boolean;
    rightward: boolean;
  }>;
  onAnimationChange: (name: string, pressed: boolean) => void;
}

export default function MobileControls({
  keysRef,
  onAnimationChange,
}: MobileControlsProps) {
  const [isWalking, setIsWalking] = useState(false);

  const handlePointerDown = useCallback(() => {
    setIsWalking(true);
    keysRef.current.forward = true;
    onAnimationChange("forward", true);
  }, [keysRef, onAnimationChange]);

  const handlePointerUp = useCallback(() => {
    setIsWalking(false);
    keysRef.current.forward = false;
    onAnimationChange("forward", false);
  }, [keysRef, onAnimationChange]);

  return (
    <button
      className="fixed bottom-4 right-4 z-50 w-20 h-20 rounded-full flex items-center justify-center select-none touch-none"
      style={{
        backgroundColor: isWalking
          ? "rgba(59, 130, 246, 0.8)"
          : "rgba(59, 130, 246, 0.4)",
        border: "2px solid rgba(255,255,255,0.6)",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <span className="text-white text-sm font-bold">Caminar</span>
    </button>
  );
}
