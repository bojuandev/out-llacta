"use client";

import { useRef, useState } from "react";
import { Button } from "@heroui/react";
import { useJoystickControls } from "ecctrl";

import CanvasEnvironment from "@/app/modules/shared/3D-components/canvas-environment";
import MainEnvironment from "@/app/modules/shared/3D-components/main-environment";
import ObjectList from "../main-virtual-tour/components/object-list";
import PlayerControl from "../../../shared/3D-components/player-control";
import { ObjectDetected } from "@/app/modules/shared/interfaces/detect-object";
import { ObjectData } from "@/app/modules/shared/interfaces/object-props";

interface PanelProps {
  objectDetected?: (door: ObjectDetected) => void;
  objectsOfPanel: ObjectData[];
  loading?: boolean;
  currentObject?: ObjectDetected;
}

function PanelView({
  objectDetected,
  objectsOfPanel,
  loading,
  currentObject,
}: PanelProps) {
  const playerRef = useRef<any>(null);
  const [currentAnimation, setCurrentAnimation] = useState<"Idle" | "Walking">(
    "Idle"
  );
  const setJoystick = useJoystickControls((state) => state.setJoystick);

  const handleAnimationChange = (name: string, pressed: boolean) => {
    const movements = ["forward", "backward", "leftward", "rightward"];

    if (movements.includes(name) && pressed) {
      setCurrentAnimation("Walking");
    }
    if (movements.includes(name) && !pressed) {
      setCurrentAnimation("Idle");
    }
  };

  const handleEnterArea = (objectData: ObjectData) => (isEnter: boolean) => {
    objectDetected?.({ ...objectData, isEnter });
  };

  const handlePointer = (pressed: boolean) => () => {
    handleAnimationChange("forward", pressed);
    setJoystick(pressed ? 1 : 0, Math.PI / 2, false);
  };

  return (
    <>
      {!loading && currentObject?.type !== "object" && (
        <Button
          className="absolute md:hidden z-10 bottom-36 right-12 w-20 h-20 border-2 border-solid text-white font-bold shadow-lg opacity-60"
          radius="full"
          color="default"
          onPointerEnter={handlePointer(true)}
          onPointerLeave={handlePointer(false)}
        >
          Caminar
        </Button>
      )}
      <CanvasEnvironment>
        <PlayerControl
          playerRef={playerRef}
          currentAnimation={currentAnimation}
          onAnimationChange={handleAnimationChange}
        />
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
