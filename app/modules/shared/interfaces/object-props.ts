import { Euler, Vector3 } from "@react-three/fiber";

export interface ObjectProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number | Vector3;
}

export interface ObjectData extends ObjectProps {
    id: string;
    label: string;
    type: "object" | "panel";
    objectWithBaseProps?: {
      srcObject: string;
      groupProps?: ObjectProps;
      objectProps?: ObjectProps;
      detectionRadius?: number;
    };
  }

  export type Panels = "adornos-corporales" | "alfareria-cocina"
  export type ObjectOfPanel = Record<string, ObjectData[]>