import { Vector3 } from "three";
import ObjectWithBase from "@/app/modules/shared/3D-components/object-with-base";
import Door from "./door";
import { ObjectData } from "@/app/modules/shared/interfaces/object-props";

interface ObjectListProps {
  objectsToRender: ObjectData[];
  playerPositionRef?: React.MutableRefObject<Vector3>;
  onEnterArea?: (objectData: ObjectData) => (isEnter: boolean) => void;
}

function ObjectList(props: ObjectListProps) {
  const getObjectsWithPositions = (): ObjectData[] => {
    const center = new Vector3(0, 0, 0);
    const radius = 10;

    return props.objectsToRender.map((object, i) => {
      const angle = (i / props.objectsToRender.length) * Math.PI * 2 + Math.PI / 2;
      const x = center.x + radius * Math.cos(angle);
      const z = center.z + radius * Math.sin(angle);
      const y = center.y;
      return {
        ...object,
        position: [x, y, z] as any,
        rotation: [0, -angle + Math.PI / 2, 0] as any,
        scale: 6,
      } as ObjectData;
    });
  };

  const playerPosition = props.playerPositionRef?.current;

  return (
    <>
      {getObjectsWithPositions().map((object) => {
        const { id, label, position, rotation, scale, type } = object;

        if (type === "panel") {
          return (
            <Door
              key={id}
              labelDoor={label}
              playerPosition={playerPosition}
              groupProps={{
                position,
                rotation,
                scale,
              }}
              onEnterArea={props.onEnterArea?.(object)}
            />
          );
        }

        return (
          <ObjectWithBase
            key={id}
            srcObject={object.objectData!.srcObject}
            labelObject={label}
            groupProps={{
              ...object.objectData!.groupProps,
              position,
              rotation,
            }}
            objectProps={object.objectData!.objectProps}
            detectionRadius={4}
            playerPosition={playerPosition}
            onEnterArea={props.onEnterArea?.(object)}
          />
        );
      })}
    </>
  );
}

export default ObjectList;
