"use client";

import { useEffect, useRef, useCallback } from "react";
import nipplejs from "nipplejs";

interface JoystickMovementProps {
  onMove: (direction: { x: number; y: number }) => void;
  onMoveEnd: () => void;
  zoneId?: string;
}

export default function JoystickMovement({
  onMove,
  onMoveEnd,
  zoneId = "joystick-zone-left",
}: JoystickMovementProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const nippleRef = useRef<any>(null);

  const handleMove = useCallback(
    (event: any) => {
      if (event.direction) {
        const normalized = {
          x: event.vector.x,
          y: event.vector.y,
        };
        onMove(normalized);
      }
    },
    [onMove]
  );

  const handleEnd = useCallback(() => {
    onMoveEnd();
  }, [onMoveEnd]);

  useEffect(() => {
    if (!zoneRef.current) return;

    nippleRef.current = nipplejs.create({
      zone: zoneRef.current,
      mode: "static",
      position: { left: "15%", bottom: "15%" },
      color: "rgba(59, 130, 246, 0.5)",
      size: 120,
    });

    nippleRef.current.on("move", handleMove);
    nippleRef.current.on("end", handleEnd);

    return () => {
      if (nippleRef.current) {
        nippleRef.current.off("move", handleMove);
        nippleRef.current.off("end", handleEnd);
        nippleRef.current.destroy();
      }
    };
  }, [handleMove, handleEnd]);

  return (
    <div
      id={zoneId}
      ref={zoneRef}
      className="fixed bottom-0 left-0 w-1/2 h-48 pointer-events-auto z-20"
      style={{ touchAction: "none" }}
    />
  );
}
