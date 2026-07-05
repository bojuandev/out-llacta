import { Vector3 } from "@react-three/fiber";

export interface PlayerProps {
  currentAnimation: "Idle" | "Walking" | "Running";
  position?: Vector3;
  rotation?: Vector3;
  scale?: number;
  playerRef?: React.Ref<any>;
}

export type PlayerAnimation = PlayerProps["currentAnimation"];
