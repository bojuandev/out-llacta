import { ObjectData, ObjectOfPanel } from "../interfaces/object-props";

export const mainShuarData: ObjectData[] = [
  { id: "adornos-corporales", label: "Adornos corporales", type: "panel" },
  {
    id: "hombre-shuar",
    label: "Hombre Shuar",
    type: "object",
    objectData: {
      srcObject: "/objects-3D/shuar/hombre-shuar/hombre-shuar.glb",
      description:
        "El hombre comunmente viste una falda llamada “itip” una especie de lienzo de líneas verticales de colores morado, rojo, negro y blanco, tinturados con vegetales, que se envuelven de la cintura hasta el tobillo y va sostenida con una faja. También visten el Kamush, hecho con corteza de árbol machacada. Su arreglo corporal se complementa con una gran variedad de coronas de plumas de tucanes y otras aves y pinturas faciales con diseños de animales, pues creen que así, estos les transmiten su fuerza y poder.",
      objectProps: {
        position: [0, 1.65, 1.5],
        rotation: [0, Math.PI, 0],
      },
      detectionRadius: 4,
      images: [
        "/objects-3D/shuar/hombre-shuar/hombre-shuar-1.webp",
        "/objects-3D/shuar/hombre-shuar/hombre-shuar-2.webp",
        "/objects-3D/shuar/hombre-shuar/hombre-shuar-3.webp",
        "/objects-3D/shuar/hombre-shuar/hombre-shuar-4.webp",
        "/objects-3D/shuar/hombre-shuar/hombre-shuar-5.webp",
        "/objects-3D/shuar/hombre-shuar/hombre-shuar-6.webp",
      ],
    },
  },
];

export const objectsOfPanel: ObjectOfPanel = {
  "adornos-corporales": [
    {
      id: "armadillo-bolso",
      label: "Bolso de Armadillo",
      type: "object",
      objectData: {
        srcObject:
          "/objects-3D/shuar/adornos-corporales/armadillo-bolso/armadillo-bolso.glb",
        description:
          "Los bolsos de la etnia Shuar son utilizados principalmente por hombres. \n No solo existen bolsos de armadillos,también existen bolsos elaborados con cuero de mono.",
        images: [
          "/objects-3D/shuar/adornos-corporales/armadillo-bolso/armadillo-bolso.webp",
        ],
        objectProps: {
          position: [0, 0, 1.5],
          rotation: [0, Math.PI, 0],
        },
        detectionRadius: 4,
      },
    },
  ],
};
