import { Euler, Vector3 } from "@react-three/fiber";

export interface SceneElementProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number | Vector3;
}

export interface ProximityDetectorProps {
  position?: Vector3;
  detectionRadius?: number;
  playerPosition?: Vector3;
  onEnterArea?: (isEnter: boolean) => void;
}
