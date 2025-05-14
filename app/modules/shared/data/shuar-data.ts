import { ObjectWithPosition } from "../interfaces/object-props";

export const mainShuarData: ObjectWithPosition[] = [
  {
    id: "hombre-shuar",
    label: "Hombre Shuar",
    type: "object",
    objectWithBaseProps: {
      srcObject: "/objects-3D/shuar/hombre-shuar.glb",
      objectProps: {
        position: [0, 1.65, 1.5],
        rotation: [0, Math.PI, 0],
      },
      detectionRadius: 4,
    },
  },

  { id: "adornos-corporales", label: "Adornos Corporales", type: "panel" }
];