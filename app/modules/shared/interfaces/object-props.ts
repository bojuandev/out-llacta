import { Euler, Vector3 } from "@react-three/fiber";

export interface ObjectProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
}

export interface ObjectWithPosition extends ObjectProps {
    id: string;
    label: string;
    type: "object" | "door";
    objectWithBaseProps?: {
      srcObject: string;
      groupProps?: ObjectProps;
      objectProps?: ObjectProps;
      detectionRadius?: number;
    };
  }