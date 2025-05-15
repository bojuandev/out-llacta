"use client";

import { useRef } from "react";
import CanvasEnvironment from "@/app/modules/shared/components/canvas-environment";
import MainEnvironment from "@/app/modules/shared/components/main-environment";
import ObjectList from "../main-virtual-tour/components/object-list";
import PlayerControl from "../../../shared/components/player-control";
import { ObjectDetected } from "@/app/modules/shared/interfaces/detect-object";
import { ObjectData } from "@/app/modules/shared/interfaces/object-props";

interface PanelProps {
  objectDetected?: (door: ObjectDetected) => void;
  objectsOfPanel: ObjectData[];
}

function PanelView({ objectDetected, objectsOfPanel }: PanelProps) {
  const playerRef = useRef<any>(null);

  const handleEnterArea = (objectData: ObjectData) => (isEnter: boolean) => {
    objectDetected?.({ ...objectData, isEnter });
  };
  return (
    <>
      <CanvasEnvironment>
        <PlayerControl playerRef={playerRef} />
        <MainEnvironment />
        <ObjectList
          playerRef={playerRef}
          onEnterArea={handleEnterArea}
          objectsToRender={objectsOfPanel}
        />
      </CanvasEnvironment>
    </>
  );
}

export default PanelView;
