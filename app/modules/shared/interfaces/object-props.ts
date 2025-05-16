import { CameraProps, Euler, Vector3 } from "@react-three/fiber";

export interface ObjectProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number | Vector3;
}

export interface ObjectData extends ObjectProps {
  id: string;
  label: string;
  type: "object" | "panel";
  objectData?: {
    srcObject: string;
    groupProps?: ObjectProps;
    objectProps?: ObjectProps;
    objectViewProps?: ObjectProps;
    detectionRadius?: number;
    description?: string;
    images?: string[];
  };
  canvasProps?: {
    camera?: CameraProps;
  };
}

export type Panels = "adornos-corporales" | "alfareria-cocina";
export type ObjectOfPanel = Record<string, ObjectData[]>;
