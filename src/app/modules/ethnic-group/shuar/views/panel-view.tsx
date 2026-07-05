"use client";

import { useState, useRef } from "react";
import CanvasEnvironment from "@/app/modules/shared/3D-components/canvas-environment";
import MainEnvironment from "@/app/modules/shared/3D-components/main-environment";
import ObjectList from "../main-virtual-tour/components/object-list";
import dynamic from "next/dynamic";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";

const MobileControls = dynamic(
  () => import("@/features/player-movement/mobile-controls"),
  { ssr: false }
);
import { ObjectDetected } from "@/app/modules/shared/interfaces/detect-object";
import { ObjectData } from "@/app/modules/shared/interfaces/object-props";
import { Vector3 } from "three";

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
  const [currentAnimation, setCurrentAnimation] = useState<"Idle" | "Walking">(
    "Idle"
  );
  const positionRef = useRef(new Vector3(0, 0.75, 0));
  const keysRef = useRef({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
  });
  const cameraYawRef = useRef(Math.PI);
  const cameraPitchRef = useRef(0);
  const isMobile = useIsMobile();

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

  return (
    <>
      <CanvasEnvironment
        playerPositionRef={positionRef}
        keysRef={keysRef}
        cameraYawRef={cameraYawRef}
        cameraPitchRef={cameraPitchRef}
        currentAnimation={currentAnimation}
        onAnimationChange={handleAnimationChange}
      >
        <MainEnvironment />
        <ObjectList
          playerPositionRef={positionRef}
          onEnterArea={handleEnterArea}
          objectsToRender={objectsOfPanel}
        />
      </CanvasEnvironment>
      {isMobile && (
        <MobileControls
          keysRef={keysRef}
          cameraYawRef={cameraYawRef}
          cameraPitchRef={cameraPitchRef}
          onAnimationChange={handleAnimationChange}
        />
      )}
    </>
  );
}

export default PanelView;
