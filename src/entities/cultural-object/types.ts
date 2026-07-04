import { CameraProps, Euler, Vector3 } from "@react-three/fiber";

export interface CulturalObjectProps {
  position?: Vector3;
  rotation?: Euler;
  scale?: number | Vector3;
}

export interface CulturalObjectData extends CulturalObjectProps {
  id: string;
  label: string;
  type: "object" | "panel";
  objectData?: {
    srcObject: string;
    groupProps?: CulturalObjectProps;
    objectProps?: CulturalObjectProps;
    objectViewProps?: CulturalObjectProps;
    detectionRadius?: number;
    description?: string;
    images?: string[];
  };
  canvasProps?: {
    camera?: CameraProps;
  };
}

export type Panels = "adornos-corporales" | "alfareria-cocina";
export type CulturalObjectMap = Record<string, CulturalObjectData[]>;
