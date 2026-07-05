"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import nipplejs from "nipplejs";

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
  const [isWalking, setIsWalking] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const joystickZoneRef = useRef<HTMLDivElement>(null);
  const nippleRef = useRef<any>(null);
  const lastTouchRef = useRef<{ x: number; y: number; id: number } | null>(null);
  const rotationTouchIdRef = useRef<number | null>(null);

  // ─── JOYSTICK (bottom-left) ───
  useEffect(() => {
    if (!joystickZoneRef.current) return;

    nippleRef.current = nipplejs.create({
      zone: joystickZoneRef.current,
      mode: "static",
      position: { left: "50%", top: "50%" },
      color: "rgba(59, 130, 246, 0.6)",
      size: 100,
    });

    nippleRef.current.on("move", (_evt: any, data: any) => {
      const threshold = 0.2;
      const x = data.vector.x;
      const y = data.vector.y; // nipplejs: y is negative up

      keysRef.current.forward = y < -threshold;
      keysRef.current.backward = y > threshold;
      keysRef.current.leftward = x < -threshold;
      keysRef.current.rightward = x > threshold;

      const moving =
        keysRef.current.forward ||
        keysRef.current.backward ||
        keysRef.current.leftward ||
        keysRef.current.rightward;

      if (moving) onAnimationChange("forward", true);
    });

    nippleRef.current.on("end", () => {
      keysRef.current.forward = false;
      keysRef.current.backward = false;
      keysRef.current.leftward = false;
      keysRef.current.rightward = false;
      onAnimationChange("forward", false);
    });

    return () => {
      if (nippleRef.current) nippleRef.current.destroy();
    };
  }, [keysRef, onAnimationChange]);

  // ─── TOUCH ROTATION + WALK BUTTON (overlay) ───
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const getZone = (x: number, y: number) => {
      const rect = overlay.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;

      // Joystick zone: bottom-left 140x140 area
      if (relX < 160 && relY > rect.height - 160) return "joystick";
      // Walk button zone: bottom-right 120x120 area
      if (relX > rect.width - 140 && relY > rect.height - 140) return "walk";
      return "rotate";
    };

    const handleTouchStart = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        const zone = getZone(t.clientX, t.clientY);

        if (zone === "walk") {
          // Walk button pressed
          setIsWalking(true);
          keysRef.current.forward = true;
          onAnimationChange("forward", true);
        } else if (zone === "rotate" && rotationTouchIdRef.current === null) {
          // First rotation touch
          rotationTouchIdRef.current = t.identifier;
          lastTouchRef.current = { x: t.clientX, y: t.clientY, id: t.identifier };
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // prevent scroll

      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];

        if (t.identifier === rotationTouchIdRef.current && lastTouchRef.current) {
          const dx = t.clientX - lastTouchRef.current.x;
          const dy = t.clientY - lastTouchRef.current.y;

          const sensitivity = 0.005;
          cameraYawRef.current -= dx * sensitivity;
          cameraPitchRef.current -= dy * sensitivity;

          // clamp pitch
          const MIN = -Math.PI / 6;
          const MAX = Math.PI / 6;
          cameraPitchRef.current = Math.max(
            MIN,
            Math.min(MAX, cameraPitchRef.current)
          );

          lastTouchRef.current = { x: t.clientX, y: t.clientY, id: t.identifier };
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        const zone = getZone(t.clientX, t.clientY);

        if (zone === "walk") {
          setIsWalking(false);
          keysRef.current.forward = false;
          onAnimationChange("forward", false);
        }

        if (t.identifier === rotationTouchIdRef.current) {
          rotationTouchIdRef.current = null;
          lastTouchRef.current = null;
        }
      }
    };

    overlay.addEventListener("touchstart", handleTouchStart, { passive: false });
    overlay.addEventListener("touchmove", handleTouchMove, { passive: false });
    overlay.addEventListener("touchend", handleTouchEnd);
    overlay.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      overlay.removeEventListener("touchstart", handleTouchStart);
      overlay.removeEventListener("touchmove", handleTouchMove);
      overlay.removeEventListener("touchend", handleTouchEnd);
      overlay.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [cameraYawRef, cameraPitchRef, keysRef, onAnimationChange]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-20"
      style={{ touchAction: "none" }}
    >
      {/* Joystick container - bottom left */}
      <div
        ref={joystickZoneRef}
        className="absolute left-4 bottom-4 w-28 h-28"
        style={{ touchAction: "none" }}
      />

      {/* Walk button - bottom right */}
      <div
        className="absolute right-4 bottom-4 w-24 h-24 rounded-full flex items-center justify-center select-none"
        style={{
          backgroundColor: isWalking
            ? "rgba(59, 130, 246, 0.8)"
            : "rgba(59, 130, 246, 0.4)",
          border: "2px solid rgba(59, 130, 246, 0.6)",
          touchAction: "none",
        }}
      >
        <span className="text-white text-sm font-bold">Caminar</span>
      </div>
    </div>
  );
}
