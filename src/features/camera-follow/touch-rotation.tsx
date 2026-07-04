"use client";

import { useEffect, useRef, useCallback } from "react";

interface TouchRotationProps {
  onRotate: (delta: { x: number; y: number }) => void;
  zoneId?: string;
}

export default function TouchRotation({
  onRotate,
  zoneId = "touch-zone-right",
}: TouchRotationProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!lastTouchRef.current) return;

      const touch = e.touches[0];
      const delta = {
        x: touch.clientX - lastTouchRef.current.x,
        y: touch.clientY - lastTouchRef.current.y,
      };

      onRotate(delta);
      lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
    },
    [onRotate]
  );

  const handleTouchEnd = useCallback(() => {
    lastTouchRef.current = null;
  }, []);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    zone.addEventListener("touchstart", handleTouchStart, { passive: false });
    zone.addEventListener("touchmove", handleTouchMove, { passive: false });
    zone.addEventListener("touchend", handleTouchEnd);

    return () => {
      zone.removeEventListener("touchstart", handleTouchStart);
      zone.removeEventListener("touchmove", handleTouchMove);
      zone.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div
      id={zoneId}
      ref={zoneRef}
      className="fixed bottom-0 right-0 w-1/2 h-48 pointer-events-auto z-10"
      style={{ touchAction: "none" }}
    />
  );
}
