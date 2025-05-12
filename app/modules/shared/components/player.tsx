"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Vector3 } from "@react-three/fiber";

interface PlayerProps {
  currentAnimation: "Idle" | "Walking" | "Running";
  position?: Vector3;
  rotation?: Vector3;
  scale?: number;
  playerRef?: any;
  [key: string]: any;
}

export default function Player(props: PlayerProps) {
  const { scene, animations } = useGLTF("/RobotExpressive.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    (actions as any).Idle.play();
  }, [actions, scene]);

  useEffect(() => {
    if (!actions) return;

    if (props.currentAnimation === "Idle") {
      (actions as any).Idle.play();
      (actions as any).Walking.stop();
      (actions as any).Running.stop();
    } else if (props.currentAnimation === "Walking") {
      (actions as any).Idle.stop();
      (actions as any).Walking.play();
    }
  }, [props.currentAnimation]);



  return <primitive ref={props.playerRef} object={scene} {...props} />;
}
