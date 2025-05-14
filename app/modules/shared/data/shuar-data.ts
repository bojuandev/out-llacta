import { ObjectData, ObjectOfPanel } from "../interfaces/object-props";

export const mainShuarData: ObjectData[] = [
  {
    id: "hombre-shuar",
    label: "Hombre Shuar",
    type: "object",
    objectData: {
      srcObject: "/objects-3D/shuar/hombre-shuar.glb",
      objectProps: {
        position: [0, 1.65, 1.5],
        rotation: [0, Math.PI, 0],
      },
      detectionRadius: 4,
    },
  },
  { id: "adornos-corporales", label: "Cacería", type: "panel" },
];

export const objectsOfPanel: ObjectOfPanel = {
  "adornos-corporales": [
    {
      id: "hombre-shuar",
      label: "Hombre Shuar",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/hombre-shuar.glb",
        objectProps: {
          position: [0, 1.65, 1.5],
          rotation: [0, Math.PI, 0],
        },
        detectionRadius: 4,
      },
    },
    {
      id: "hombre-shuar2",
      label: "Hombre Shuar",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/hombre-shuar.glb",
        objectProps: {
          position: [0, 1.65, 1.5],
          rotation: [0, Math.PI, 0],
        },
        detectionRadius: 4,
      },
    },
  ],
};
