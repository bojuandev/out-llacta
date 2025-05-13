"use client";

import { RigidBody } from "@react-three/rapier";
import PlayerControl from "../../../shared/components/player-control";
import CanvasEnvironment from "@/app/modules/shared/components/canvas-environment";
import { useRef } from "react";
import { Box } from "@react-three/drei";
import ObjectList from "./components/object-list";
import ObjectWithBase from "@/app/modules/shared/components/object-with-base";
import Door from "./components/door";
import { ObjectWithPosition } from "@/app/modules/shared/interfaces/object-props";

const objects: ObjectWithPosition[] = [
  {
    id: "door-1",
    label: "Puerta 1",
    type: "object",
    objectWithBaseProps: {
      srcObject: "/objects-3D/shuar/kanantiu.glb",
      objectProps: {
        position: [0, 2.5, -2],
        rotation: [0, Math.PI / 2, Math.PI / 2],
      },
      detectionRadius: 4,
    },
  },

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

interface MainVirtualTourProps {
  doorDetected?: (door: { name: string; isEnter: boolean }) => void;
}

function MainVirtualTour({ doorDetected }: MainVirtualTourProps) {
  const playerRef = useRef<any>(null);

  const handleEnterArea = (doorName: string) => (isEnter: boolean) => {
    doorDetected?.({
      name: doorName,
      isEnter,
    });
  };
  return (
    <>
      <CanvasEnvironment>
        <PlayerControl playerRef={playerRef} />

        <RigidBody type="fixed" colliders="trimesh">
          <Box position={[0, 0, 0]} scale={[30, 0.5, 30]} />
        </RigidBody>

        {/* <Door
          labelDoor="Puerta 1"
          groupProps={{
            position: [5, 0, 10],
            rotation: [0, 0, 0],
            scale: 6,
          }}
          playerRef={playerRef}
          onEnterArea={handleEnterArea("door-1")}
        />

        <ObjectWithBase
          srcObject="/objects-3D/shuar/kanantiu.glb"
          labelObject="Kanantui"
          groupProps={{
            position: [0, 0, 10],
          }}
          objectProps={{
            position: [0, 2.5, -2],
            rotation: [0, Math.PI / 2, Math.PI / 2],
          }}
          detectionRadius={4}
          playerRef={playerRef}
          onEnterArea={handleEnterArea("kanantui")}
        /> */}

        <ObjectList
          playerRef={playerRef}
          onEnterArea={handleEnterArea}
          objectsToRender={objects}
        />
      </CanvasEnvironment>
    </>
  );
}

export default MainVirtualTour;
