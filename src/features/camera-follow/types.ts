import { Vector3 } from "@react-three/fiber";

export interface CameraFollowOptions {
  distance?: number;
  height?: number;
  smoothing?: number;
}

export interface CameraFollowState {
  position: Vector3;
  target: Vector3;
}
