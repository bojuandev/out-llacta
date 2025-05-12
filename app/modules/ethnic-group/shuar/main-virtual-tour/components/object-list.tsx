import { Vector3 } from "three";
import Door from "./door";

interface ObjectListProps {
  playerRef?: any;
  onEnterArea?: (doorName: string) => (isEnter: boolean) => void;
}

function ObjectList(props: ObjectListProps) {
  const getObjectsWithPositions = () => {
    const center = new Vector3(0, 0, 0);
    const radius = 10;
    const objects = [
      { id: "door-1", label: "Puerta 1", type: "door" },
      { id: "door-2", label: "Puerta 2", type: "door" },
      { id: "door-3", label: "Puerta 3", type: "door" },
      { id: "door-4", label: "Puerta 4", type: "door" },
      { id: "door-5", label: "Puerta 5", type: "door" },
      { id: "door-6", label: "Puerta 6", type: "door" },
      { id: "door-7", label: "Puerta 7", type: "door" },
      { id: "door-8", label: "Puerta 8", type: "door" },
      { id: "door-9", label: "Puerta 9", type: "door" },
      { id: "door-10", label: "Puerta 10", type: "door" },
    ];

    return objects.map((object, i) => {
      const angle = (i / objects.length) * Math.PI * 2 + Math.PI / 2;
      const x = center.x + radius * Math.cos(angle);
      const z = center.z + radius * Math.sin(angle);
      const y = center.y;
      return {
        ...object,
        position: [x, y, z] as any,
        rotation: [0, -angle - Math.PI / 2, 0] as any,
        scale: 6,
        Component: Door,
      };
    });
  };

  return (
    <>
      {getObjectsWithPositions().map((object) => {
        const { id, label, position, rotation, scale, Component } = object;
        return (
          <Component
            key={id}
            labelDoor={label}
            playerRef={props.playerRef}
            position={position}
            rotation={rotation}
            scale={scale}
            onEnterArea={props.onEnterArea?.(label)}
          />
        );
      })}
    </>
  );
}

export default ObjectList;
