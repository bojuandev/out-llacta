"use client";

import { forwardRef, useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

interface PlayerProps {
  currentAnimation: "Idle" | "Walking" | "Running";
  position?: Vector3;
  rotation?: Vector3;
  scale?: number;
}

const Player = forwardRef<any, PlayerProps>(function Player(props, ref) {
  const { scene, animations } = useGLTF("/objects-3D/commons/robot-expressive.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    (actions as any).Idle.play();
  }, [actions, scene]);

  useEffect(() => {
    if (!actions) return;

    if (props.currentAnimation === "Idle") {
      (actions as any).Idle.play();
      (actions as any).Walking.stop();
      (actions as any).Running?.stop();
    } else if (props.currentAnimation === "Walking") {
      (actions as any).Idle.stop();
      (actions as any).Walking.play();
    }
  }, [props.currentAnimation, actions]);

  return (
    <primitive
      ref={ref}
      object={scene}
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
    />
  );
});

export default Player;
