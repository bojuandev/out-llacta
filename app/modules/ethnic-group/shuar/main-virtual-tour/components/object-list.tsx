import { Vector3 } from "three";
import ObjectWithBase from "@/app/modules/shared/components/object-with-base";
import Door from "./door";
import { ObjectWithPosition } from "@/app/modules/shared/interfaces/object-props";


interface ObjectListProps {
  objectsToRender: ObjectWithPosition[];
  playerRef?: any;
  onEnterArea?: (doorName: string) => (isEnter: boolean) => void;
}

function ObjectList(props: ObjectListProps) {
  const getObjectsWithPositions = (): ObjectWithPosition[] => {
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
      } as ObjectWithPosition;
    });
  };

  return (
    <>
      {getObjectsWithPositions().map((object) => {
        const { id, label, position, rotation, scale } = object;

        if (object.type === "door") {
          return (
            <Door
              key={id}
              labelDoor={label}
              playerRef={props.playerRef}
              groupProps={{
                position,
                rotation,
                scale,
              }}
              onEnterArea={props.onEnterArea?.(label)}
            />
          );
        }

        return (
          <ObjectWithBase
            key={id}
            srcObject={object.objectWithBaseProps!.srcObject}
            labelObject={label}
            groupProps={{
              ...object.objectWithBaseProps!.groupProps,
              position,
              rotation,
            }}
            objectProps={object.objectWithBaseProps!.objectProps}
            detectionRadius={4}
            playerRef={props.playerRef}
            onEnterArea={props.onEnterArea?.(label)}
          />
        );
      })}
    </>
  );
}

export default ObjectList;
