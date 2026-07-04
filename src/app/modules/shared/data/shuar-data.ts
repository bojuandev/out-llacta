import { ObjectData, ObjectOfPanel } from "../interfaces/object-props";

export const mainShuarData: ObjectData[] = [
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
  { id: "adornos-corporales", label: "Adornos corporales", type: "panel" },
  { id: "alfareria-cocina", label: "Alfarería y Cocina", type: "panel" },
  { id: "caceria-armas", label: "Cacería y Armas", type: "panel" },
  {
    id: "instrumentos-musicales",
    label: "Instrumentos musicales",
    type: "panel",
  },
  { id: "navegacion-pesca", label: "Navegación y pesca", type: "panel" },
  { id: "tejidos-canastos", label: "Tejidos y Canastos", type: "panel" },
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
    {
      id: "collar-caracoles",
      label: "Collar de Caracoles",
      type: "object",
      objectData: {
        srcObject:
          "/objects-3D/shuar/adornos-corporales/collar-caracoles/collar-caracoles.glb",
        description:
          "Este collar se caracteriza por estar hecho principalmente por caracoles y rocas de rio. Utilizados exclusivamente por hombres.",
        images: [
          "/objects-3D/shuar/adornos-corporales/collar-caracoles/collar-caracoles.webp",
        ],
        objectProps: {
          position: [0, 1.5, 1],
          rotation: [0, Math.PI, 0],
          scale: 0.3,
        },
        objectViewProps: {
          position: [0.2, -1, 2],
          rotation: [0, Math.PI, 0],
          scale: 0.2,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "natsum",
      label: "Natsum",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/adornos-corporales/natsum/natsum.glb",
        description:
          "Cintura con cinta tejida, en sus extremidades lleva cinta y cabellos. Se la usa para sostener el itip (vestido de varón).",
        images: ["/objects-3D/shuar/adornos-corporales/natsum/natsum.webp"],
        objectProps: {
          position: [0, 4.8, 0],
          rotation: [0, 0, 0],
          scale: 0.7,
        },
        objectViewProps: {
          position: [0, 1.5, 1],
          rotation: [0, Math.PI, 0],
          scale: 0.4,
        },
        detectionRadius: 4,
      },
      canvasProps: {
        camera: {
          fov: 100,
          position: [0, 2, 10],
        },
      },
    },
    {
      id: "tawashap",
      label: "Tawashap",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/adornos-corporales/tawashap/tawashap.glb",
        description:
          "Corona shuar, que llevan los hombres valientes. Para su elaboración se requiere una docena de tucanes, de los cuales se utilizan exclusivamente las plumas debajo de su cola. El tejido de esta corona se lo elabora con algodón u otra fibra.",
        images: [
          "/objects-3D/shuar/adornos-corporales/tawashap/tawashap-1.webp",
          "/objects-3D/shuar/adornos-corporales/tawashap/tawashap-2.webp",
        ],
        objectProps: {
          position: [0, -1.3, -1],
          rotation: [0, 0, 0],
          scale: 1.5,
        },
        objectViewProps: {
          position: [0, 1, 1],
          rotation: [0, Math.PI, 0],
          scale: 1.6,
        },
        detectionRadius: 4,
      },
      canvasProps: {
        camera: {
          fov: 100,
          position: [0, 2, 10],
        },
      },
    },
    {
      id: "temash",
      label: "Temash",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/adornos-corporales/temash/temash.glb",
        description:
          "Es una peinilla fabricada con carrizo y amarrada con hilos de colores. Con este hilo se tejen los mismos diseños utilizados en las cintas.",
        images: [
          "/objects-3D/shuar/adornos-corporales/temash/temash-1.webp",
          "/objects-3D/shuar/adornos-corporales/temash/temash-2.webp",
        ],
        objectProps: {
          position: [0, 0 - 0.5, -1],
          rotation: [0, 0, 0],
          scale: 1.5,
        },
        objectViewProps: {
          position: [0, 1, 1],
          rotation: [0, Math.PI, 0],
          scale: 1.6,
        },
        detectionRadius: 4,
      },
      canvasProps: {
        camera: {
          fov: 100,
          position: [0, 2, 10],
        },
      },
    },
  ],
  "alfareria-cocina": [
    {
      id: "ichinkian",
      label: "Ichinkian",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/alfareria-cocina/ichinkian/ichinkian.glb",
        description:
          "Hecha de arcilla ácida, donde no es una tarea fácil conseguirla. Esta olla se caracteriza por ser grande y es utilizada para fermentar la chicha.",
        images: ["/objects-3D/shuar/alfareria-cocina/ichinkian/ichinkian.webp"],
        objectProps: {
          position: [0, -1.7, 2.5],
          rotation: [0, Math.PI, 0],
          scale: 2,
        },
        objectViewProps: {
          position: [0, 1, 0],
          rotation: [0, Math.PI, 0],
          scale: 2.2,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "pinink",
      label: "Pinink",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/alfareria-cocina/pinink/pinink.glb",
        description:
          "Hecha de arcilla ácida, donde no es una tarea fácil conseguirla. Esta olla se caracteriza por ser grande y es utilizada para fermentar la chicha.",
        images: [
          "/objects-3D/shuar/alfareria-cocina/pinink/pinink-1.webp",
          "/objects-3D/shuar/alfareria-cocina/pinink/pinink-2.webp",
          "/objects-3D/shuar/alfareria-cocina/pinink/pinink-3.webp",
        ],
        objectProps: {
          position: [0, 0.05, 1.8],
          rotation: [0, Math.PI, 0],
          scale: 1,
        },
        objectViewProps: {
          position: [0.05, 1, 0],
          rotation: [0, Math.PI, 0],
          scale: 2,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "pumput",
      label: "Pumput",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/alfareria-cocina/pumput/pumput.glb",
        description:
          "Recipiente cuadrado o redondo de madera, en el que se pica la yuca.",
        images: ["/objects-3D/shuar/alfareria-cocina/pumput/pumput.webp"],
        objectProps: {
          position: [0, 0.05, 6],
          rotation: [-Math.PI * 0.2, Math.PI, 0],
          scale: 2,
        },
        objectViewProps: {
          position: [0, 1, 0],
          rotation: [Math.PI * 0.2, Math.PI, 0],
          scale: 2,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "tsatsa",
      label: "Tsatsa",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/alfareria-cocina/tsatsa/tsatsa.glb",
        description:
          "Recipiente obtenido del árbol tsatsa. La calabaza, se la parte por la mitad, se la agujerea, y se la utiliza para cernir la chicha.",
        images: ["/objects-3D/shuar/alfareria-cocina/tsatsa/tsatsa.webp"],
        objectProps: {
          position: [0, 0.5, 1.5],
          rotation: [0, Math.PI, 0],
          scale: 1,
        },
        objectViewProps: {
          position: [0, 1, 0],
          rotation: [0, Math.PI, 0],
          scale: 1,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "wempenk",
      label: "Wempenk",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/alfareria-cocina/Wempenk/wempenk.glb",
        description:
          "Recipiente de forma alargada. Se utiliza para transportar líquidos.",
        images: ["/objects-3D/shuar/alfareria-cocina/Wempenk/wempenk.webp"],
        objectProps: {
          position: [0, 1.15, 0],
          rotation: [0, 0, 0],
          scale: 0.7,
        },
        objectViewProps: {
          position: [0, -0.5, 0],
          rotation: [0, Math.PI, 0],
          scale: 0.7,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "yukunt",
      label: "Yukunt",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/alfareria-cocina/yukunt/yukunt.glb",
        description: "Taza muy pequeña para infusiones.",
        images: [
          "/objects-3D/shuar/alfareria-cocina/yukunt/yukunt-1.webp",
          "/objects-3D/shuar/alfareria-cocina/yukunt/yukunt-2.webp",
        ],
        objectProps: {
          position: [0, -0.55, 0],
          rotation: [0, 0, 0],
          scale: 1,
        },
        objectViewProps: {
          position: [0, 0, 0],
          rotation: [0, Math.PI, 0],
          scale: 0.9,
        },
        detectionRadius: 4,
      },
    },
  ],
  "caceria-armas": [
    {
      id: "nanki",
      label: "Nanki",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/caceria-armas/nanki/nanki.glb",
        description:
          "Lanza que sirve para matar a hombres y a animales. Generalmente está elaborada en chonta, mide 2 metros de largo por 1,50 cm de diametro. La cabeza tiene en forma prismática y se la suele adornar con plumas de loro.",
        images: [
          "/objects-3D/shuar/caceria-armas/nanki/nanki-1.webp",
          "/objects-3D/shuar/caceria-armas/nanki/nanki-2.webp",
        ],
        objectProps: {
          position: [0, 3, 0],
          rotation: [0, 0, 0],
          scale: 0.1,
        },
        objectViewProps: {
          position: [0, 0, -1],
          rotation: [0, Math.PI, 0],
          scale: 0.1,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "tantar",
      label: "Tantar",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/caceria-armas/tantar/tantar.glb",
        description:
          "Escudo utilizado para la defensa y también tiene un fin ceremonial. Se lo obtiene de la raíz externa del Wemp, tiene 60cm de diámetro, en el centro lleva una agarradera de bejuco.",
        images: [
          "/objects-3D/shuar/caceria-armas/tantar/tantar-1.webp",
          "/objects-3D/shuar/caceria-armas/tantar/tantar-2.webp",
        ],
        objectProps: {
          position: [0, -0.4, 1],
          rotation: [0, Math.PI, 0],
          scale: 1.3,
        },
        objectViewProps: {
          position: [0, 0, -1],
          rotation: [0, 0, 0],
          scale: 2,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "tsantsa",
      label: "Tsantsa",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/caceria-armas/tsantsa/tsantsa.glb",
        description:
          "La práctica de la reducción de las cabezas ha hecho famosos a los Shuar en todo el mundo. Una vez muerto el enemigo, los Shuar cortaban su cabeza para reducirla y realizar una complicada celebración. Este proceso duraban entre 3 - 4 días y consistía en quitar el cráneo, hacer hervir la cabeza durante 15 minutos, luego coser todos sus orificios, rellenarla de arena y piedritas calientes y dejarla sobre una estaca.",
        images: [
          "/objects-3D/shuar/caceria-armas/tsantsa/tsantsa-1.webp",
          "/objects-3D/shuar/caceria-armas/tsantsa/tsantsa-2.webp",
          "/objects-3D/shuar/caceria-armas/tsantsa/tsantsa-3.webp",
          "/objects-3D/shuar/caceria-armas/tsantsa/tsantsa-4.webp",
          "/objects-3D/shuar/caceria-armas/tsantsa/tsantsa-5.webp",
          "/objects-3D/shuar/caceria-armas/tsantsa/tsantsa-6.webp",
          "/objects-3D/shuar/caceria-armas/tsantsa/tsantsa-7.webp",
        ],
        objectProps: {
          position: [0, 1.3, 1],
          rotation: [0, 0, 0],
          scale: 0.15,
        },
        objectViewProps: {
          position: [0, -1, 0],
          rotation: [0, Math.PI, 0],
          scale: 0.2,
        },
        detectionRadius: 4,
      },
    },
  ],
  "instrumentos-musicales": [
    {
      id: "kantash",
      label: "Kantash",
      type: "object",
      objectData: {
        srcObject:
          "/objects-3D/shuar/instrumentos-musicales/kantash/kantash.glb",
        description:
          "Rondador que se compone de cinco carrizos verticales, de distintos tamaños, amarrados entre sí.",
        images: [
          "/objects-3D/shuar/instrumentos-musicales/kantash/kantash.webp",
        ],
        objectProps: {
          position: [0, -4, -2],
          rotation: [0, 0, 0],
          scale: 3,
        },
        objectViewProps: {
          position: [0, 1, 0],
          rotation: [0, Math.PI, 0],
          scale: 4,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "kitiar",
      label: "Kitiar",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/instrumentos-musicales/kitiar/kitiar.glb",
        description:
          "Instrumento parecido al violín. Es hecho de cedro y tiene dos cuerdas, hechas de pelos entrelazados con kumai. El arco para tocar es un carrizo templado con tripa de cuy.",
        images: [
          "/objects-3D/shuar/instrumentos-musicales/kitiar/kitiar-1.webp",
          "/objects-3D/shuar/instrumentos-musicales/kitiar/kitiar-2.webp",
        ],
        objectProps: {
          position: [0, 5.5, 6],
          rotation: [Math.PI / 2, 0, Math.PI],
          scale: 2,
        },
        objectViewProps: {
          position: [0, 0.3, 0],
          rotation: [Math.PI / 2, 0, 0],
          scale: 1.5,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "pinkiui",
      label: "Pinkiui",
      type: "object",
      objectData: {
        srcObject:
          "/objects-3D/shuar/instrumentos-musicales/pinkiui/pinkiui.glb",
        description:
          "Es una flauta hecha de carrizo o de guadúa. Tiene dos orificios, ubicados a una pulgada de cada extremidad.",
        images: [
          "/objects-3D/shuar/instrumentos-musicales/pinkiui/pinkiui-1.webp",
          "/objects-3D/shuar/instrumentos-musicales/pinkiui/pinkiui-2.webp",
        ],
        objectProps: {
          position: [0, 1, 0],
          rotation: [0, 0, 0],
          scale: 1,
        },
        objectViewProps: {
          position: [0, 0.3, 0],
          rotation: [0, 0, 0],
          scale: 1,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "tampur",
      label: "Tampur",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/instrumentos-musicales/tampur/tampur.glb",
        description:
          "Tambor utilizado en los bailes. Se lo fabrica con madera de cedro y con piel de sajino, tigrillo o mono sepúr y se lo amarra con hilo de kumai. Tiene 30cm de diámetro y 30cm de alto.",
        images: [
          "/objects-3D/shuar/instrumentos-musicales/tampur/tampur-1.webp",
          "/objects-3D/shuar/instrumentos-musicales/tampur/tampur-2.webp",
          "/objects-3D/shuar/instrumentos-musicales/tampur/tampur-3.webp",
        ],
        objectProps: {
          position: [0, -4.8, -2.5],
          rotation: [0, 0, 0],
          scale: 3,
        },
        objectViewProps: {
          position: [0, 0.3, 0],
          rotation: [0, 0, 0],
          scale: 3,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "tumank",
      label: "Tumank",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/instrumentos-musicales/tumank/tumank.glb",
        description:
          "Llamado también tsayantur, es un instrumento de carrizo templo con tripas de cuy. Con los labios se modula el sonido y con los dedos se tocan las cuerdas.",
        images: ["/objects-3D/shuar/instrumentos-musicales/tumank/tumank.webp"],
        objectProps: {
          position: [5, 3.5, -2],
          rotation: [0, 0, Math.PI / 2],
          scale: 2,
        },
        objectViewProps: {
          position: [0, 0.3, 0],
          rotation: [0, 0, Math.PI / 2],
          scale: 2,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "tuntui",
      label: "Tuntui",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/instrumentos-musicales/tuntui/tuntui.glb",
        description:
          "Es un instrumento de madera de shimiut, que se lo utiliza para enviar señales. Mide entre 1 - 1.50 mts y se lo trabaja cuando la madera está aún fresca. Mientras dura su fabricación el hombre debe tener restricción en las comidas y no debe acercarse a las mujeres.",
        images: [
          "/objects-3D/shuar/instrumentos-musicales/tuntui/tuntui-1.webp",
          "/objects-3D/shuar/instrumentos-musicales/tuntui/tuntui-2.webp",
          "/objects-3D/shuar/instrumentos-musicales/tuntui/tuntui-3.webp",
          "/objects-3D/shuar/instrumentos-musicales/tuntui/tuntui-4.webp",
        ],
        objectProps: {
          position: [0, -1.2, -1],
          rotation: [0, 0, 0],
          scale: 1.5,
        },
        objectViewProps: {
          position: [0, 0.3, 0],
          rotation: [0, 0, 0],
          scale: 1,
        },
        detectionRadius: 4,
      },
    },
  ],
  "navegacion-pesca": [
    {
      id: "kanantiu",
      label: "kanantiu",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/navegacion-pesca/kanantiu/kanantiu.glb",
        description:
          "Remo de madera, complementa a Kanu y sirve para dar dirección a la canoa.",
        images: ["/objects-3D/shuar/navegacion-pesca/kanantiu/kanantiu.webp"],
        objectProps: {
          position: [0, 4.2, -2],
          rotation: [Math.PI / 2, 0, 0],
          scale: 1,
        },
        objectViewProps: {
          position: [0, 0, 0],
          rotation: [Math.PI / 2, 0, 0],
          scale: 1,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "kanu",
      label: "kanu",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/navegacion-pesca/kanu/kanu.glb",
        description:
          "Canoa Shuar. Se la contruye con madera de cedro, canelo o washik. Primeramente se debe dejar el tronco cierto tiempo en el suelo, para que se seque y no se raje más tarde.",
        images: ["/objects-3D/shuar/navegacion-pesca/kanu/kanu.webp"],
        objectProps: {
          position: [0, 1.1, 0],
          rotation: [0, 0, 0],
          scale: 0.5,
        },
        objectViewProps: {
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: 0.3,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "neka",
      label: "Neka",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/navegacion-pesca/neka/neka.glb",
        description:
          "Red de pesca elaborada con piolas de kumai. Tiene mallas romboides de 3-4cm de lado; de 30-40 cm de alto; 10 -12 mts de largo. Se fabrica con trocitos de madera que cumplen la función de flotadores.",
        images: [
          "/objects-3D/shuar/navegacion-pesca/neka/neka-1.webp",
          "/objects-3D/shuar/navegacion-pesca/neka/neka-2.webp",
        ],
        objectProps: {
          position: [0, -0.1, 1],
          rotation: [-Math.PI / 5, 0, 0],
          scale: 1,
        },
        objectViewProps: {
          position: [0, 0, 0],
          rotation: [Math.PI / 5, 0, 0],
          scale: 1.3,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "waiakar",
      label: "Waiakar",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/navegacion-pesca/waiakar/waiakar.glb",
        description:
          "Es una trampa para pescar en riachuelos. Se la fabrica con tiras de pindo, que son amarradas con bejucos.",
        images: [
          "/objects-3D/shuar/navegacion-pesca/waiakar/waiakar-1.webp",
          "/objects-3D/shuar/navegacion-pesca/waiakar/waiakar-2.webp",
        ],
        objectProps: {
          position: [0, 1.2, 0],
          rotation: [0, 0, 0],
          scale: 0.7,
        },
        objectViewProps: {
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: 0.8,
        },
        detectionRadius: 4,
      },
    },
  ],
  "tejidos-canastos": [
    {
      id: "chankin",
      label: "Chankin",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/tejidos-canastos/chankin/chankin.glb",
        description:
          "Canasto elaborado con una variedad de bejuco kaap, el cual debe estar maduro. Para su tejido se usa la técnica de enrejado y se lo utiliza para llevar y guardar comida.",
        images: [
          "/objects-3D/shuar/tejidos-canastos/chankin/chankin-1.webp",
          "/objects-3D/shuar/tejidos-canastos/chankin/chankin-2.webp",
        ],
        objectProps: {
          position: [0, -5.5, -2],
          rotation: [0, 0, 0],
          scale: 3,
        },
        objectViewProps: {
          position: [0, 0, 0],
          rotation: [0, Math.PI, 0],
          scale: 3,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "itip",
      label: "Itip",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/tejidos-canastos/itip/itip.glb",
        description:
          "Falda corta de algodón, tejida en un telar. Es usada por los hombres. Si se cosen juntos dos itip, se obtiene un vestido de mujer, tarach.",
        images: ["/objects-3D/shuar/tejidos-canastos/itip/itip.webp"],
        objectProps: {
          position: [-1.4, -0.15, -0],
          rotation: [0, Math.PI / 2, 0],
          scale: 1.4,
        },
        objectViewProps: {
          position: [0, 0, 0],
          rotation: [0, Math.PI / 2, 0],
          scale: 1,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "kamush",
      label: "Kamush",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/tejidos-canastos/kamush/kamush.glb",
        description:
          "Corteza que se utiliza para confeccionar las faldas del hombre y la mujer. Una vez sacada la corteza de árbol, se la deja de 5 a 6 días en el agua, después se la golpea y se la recorta de manera regular. Es considerada de una durabilidad inferior y además revela pobreza pereza o debilidad de la familia.",
        images: [
          "/objects-3D/shuar/tejidos-canastos/kamush/kamush-1.webp",
          "/objects-3D/shuar/tejidos-canastos/kamush/kamush-2.webp",
        ],
        objectProps: {
          position: [0, -0.3, -1],
          rotation: [0, 0, 0],
          scale: 1.4,
        },
        objectViewProps: {
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: 1.5,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "pitiak",
      label: "Pitiak",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/tejidos-canastos/pitiak/pitiak.glb",
        description:
          "Canasto impermeable, a prueba de insectos. Tiene dos paredes entre las cuales se colocan hojas de plátano y una tapa. Sirve para guardar adornos de plumas y otros artefactos personales.",
        images: ["/objects-3D/shuar/tejidos-canastos/pitiak/pitiak.webp"],
        objectProps: {
          position: [0, -8.1, -3.3],
          rotation: [0, 0, 0],
          scale: 4,
        },
        objectViewProps: {
          position: [0, -2, 0],
          rotation: [0, 0, 0],
          scale: 4,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "shikiar",
      label: "Shikiar",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/tejidos-canastos/shikiar/shikiar.glb",
        description:
          "Bolso de malla. Se elabora con piolas de kumai o de wasake. Para su tejido se utiliza un palito de pindo o de guadúa.",
        images: [
          "/objects-3D/shuar/tejidos-canastos/shikiar/shikiar-1.webp",
          "/objects-3D/shuar/tejidos-canastos/shikiar/shikiar-2.webp",
        ],
        objectProps: {
          position: [0, 0, -1],
          rotation: [0, 0, 0],
          scale: 1,
        },
        objectViewProps: {
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: 2,
        },
        detectionRadius: 4,
      },
    },
    {
      id: "uyunt",
      label: "Uyunt",
      type: "object",
      objectData: {
        srcObject: "/objects-3D/shuar/tejidos-canastos/uyunt/uyunt.glb",
        description:
          "Bolsa más pequeña y apretada, que se elabora con piolas de kumai o de wasake.",
        images: [
          "/objects-3D/shuar/tejidos-canastos/uyunt/uyunt-1.webp",
          "/objects-3D/shuar/tejidos-canastos/uyunt/uyunt-2.webp",
        ],
        objectProps: {
          position: [0, -0.3, -1],
          rotation: [0, 0, 0],
          scale: 1,
        },
        objectViewProps: {
          position: [0, -1, 0],
          rotation: [0, 0, 0],
          scale: 1,
        },
        detectionRadius: 4,
      },
    },
  ],
};
