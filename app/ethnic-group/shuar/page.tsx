"use client";

import MainPanelView from "@/app/modules/ethnic-group/shuar/views/main-panel-view";
import ObjectDetailView from "@/app/modules/ethnic-group/shuar/views/object-detail-view";
import { ObjectDetected } from "@/app/modules/shared/interfaces/detect-object";
import InterfaceLayout from "@/app/modules/shared/layouts/interface-layout";
import { useState } from "react";

const Shuar = () => {
  const [currentView, setCurrentView] = useState<"main" | "panel" | "object">(
    "main"
  );
  const [objectDetected, setObjectDetected] = useState<ObjectDetected | null>(
    null
  );
  const [showPanelObjectDetected, setShowPanelObjectDetected] =
    useState<boolean>(false);

  const handleObjectDetected = (objectDetected: ObjectDetected) => {
    console.log("Object detected:", objectDetected);

    setShowPanelObjectDetected(objectDetected.isEnter);
    setObjectDetected(objectDetected.isEnter ? objectDetected : null);
  };

  const handleGoView = (objectDetected: ObjectDetected) => {
    setCurrentView(objectDetected.type)
  }

  return (
    <InterfaceLayout
      showPanelObjectDetected={showPanelObjectDetected}
      objectDetected={objectDetected}
      goView={handleGoView}
    >
      {currentView === "main" && (
        <MainPanelView objectDetected={handleObjectDetected} />
      )}
      {currentView === "object" && (
        <ObjectDetailView src="/objects-3D/commons/robot-expressive.glb" />
      )}
    </InterfaceLayout>
  );
};

export default Shuar;
