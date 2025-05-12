"use client";

import MainVirtualTour from "@/app/modules/ethnic-group/shuar/main-virtual-tour/main-virtual-tour";
import ObjectButton from "@/app/modules/shared/components/object-button";
import { useState } from "react";

const Shuar = () => {
  const [doorDetected, setDoorDetected] = useState<string | null>(null);

  const handleDoorDetected = (door: { name: string; isEnter: boolean }) => {
    setDoorDetected(door.isEnter ? door.name : null);
  };

  return (
    <div className="w-full h-screen relative">
      <MainVirtualTour doorDetected={handleDoorDetected} />
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
