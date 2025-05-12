"use client";
import VirtualTour from "@/app/modules/ethnic-group/shuar/components/virtual-tour";
import ObjectButton from "@/app/modules/shared/object-button";
import { useState } from "react";

const Shuar = () => {
  const [doorDetected, setDoorDetected] = useState<string | null>(null);

  const handleDoorDetected = (door: { name: string; isEnter: boolean }) => {
    setDoorDetected(door.isEnter ? door.name : null);
  };

  return (
    <div className="w-full h-screen relative">
      <VirtualTour doorDetected={handleDoorDetected} />
      {doorDetected && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2- p-4">
          <ObjectButton
            label={doorDetected}
            onClick={() => {
              console.log("Visitar", doorDetected);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Shuar;
