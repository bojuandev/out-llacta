"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

interface CameraControllerProps {
  targetPosition: React.MutableRefObject<Vector3>;
  cameraYawRef: React.MutableRefObject<number>;
  cameraPitchRef: React.MutableRefObject<number>;
  offsetHeight?: number;
  offsetDistance?: number;
  smoothness?: number;
}

const MIN_PITCH = -Math.PI / 3;
const MAX_PITCH = Math.PI / 3;

export default function CameraController({
  targetPosition,
  cameraYawRef,
  cameraPitchRef,
  offsetHeight = 3,
  offsetDistance = 7,
  smoothness = 0.1,
}: CameraControllerProps) {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - lastMouse.current.x;
      const deltaY = e.clientY - lastMouse.current.y;

      cameraYawRef.current -= deltaX * 0.005;
      cameraPitchRef.current -= deltaY * 0.005;
      cameraPitchRef.current = Math.max(MIN_PITCH, Math.min(MAX_PITCH, cameraPitchRef.current));

      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("contextmenu", handleContextMenu);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [gl, cameraYawRef, cameraPitchRef]);

  useFrame(() => {
    const target = targetPosition.current;
    const yaw = cameraYawRef.current;
    const pitch = cameraPitchRef.current;

    const horizontalDist = Math.cos(pitch) * offsetDistance;
    const x = target.x + Math.sin(yaw) * horizontalDist;
    const y = target.y + offsetHeight + Math.sin(pitch) * offsetDistance;
    const z = target.z + Math.cos(yaw) * horizontalDist;

    camera.position.lerp(new Vector3(x, y, z), smoothness);
    camera.lookAt(target);
  });

  return null;
}
