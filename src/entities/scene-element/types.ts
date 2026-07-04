import { Euler, Vector3 } from "@react-three/fiber";

export interface SceneElementProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number | Vector3;
}

export interface ProximityDetectorProps {
  position?: Vector3;
  detectionRadius?: number;
  playerRef?: React.Ref<any>;
  onEnterArea?: (isEnter: boolean) => void;
}
