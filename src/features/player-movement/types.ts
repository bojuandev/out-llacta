import { Vector3 } from "@react-three/fiber";

export interface PlayerMovementState {
  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
}

export interface PlayerMovementOptions {
  maxSpeed?: number;
  acceleration?: number;
  deceleration?: number;
}

export interface PlayerMovementResult {
  velocity: Vector3;
  isMoving: boolean;
}
