"use client";

import { useRef } from "react";
import CanvasEnvironment from "@/app/modules/shared/components/canvas-environment";
import MainEnvironment from "@/app/modules/shared/components/main-environment";
import { mainShuarData } from "@/app/modules/shared/data/shuar-data";
import ObjectList from "../main-virtual-tour/components/object-list";
import PlayerControl from "../../../shared/components/player-control";
import { ObjectDetected } from "@/app/modules/shared/interfaces/detect-object";

interface MainPanelProps {
  objectDetected?: (door: ObjectDetected) => void;
}

function MainPanel({ objectDetected }: MainPanelProps) {
  const playerRef = useRef<any>(null);

  const handleEnterArea =
    (id: string, doorName: string, type: "panel" | "object") =>
    (isEnter: boolean) => {
      objectDetected?.({
        id,
        name: doorName,
        isEnter,
        type,
      });
    };
  return (
    <>
      <CanvasEnvironment>
        <PlayerControl playerRef={playerRef} />
        <MainEnvironment />
        <ObjectList
          playerRef={playerRef}
          onEnterArea={handleEnterArea}
          objectsToRender={mainShuarData}
        />
      </CanvasEnvironment>
    </>
  );
}

export default MainPanel;
