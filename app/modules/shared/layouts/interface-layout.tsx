"use-client";

import { Button } from "@heroui/react";
import FloatingImagePanel from "../ui-components/floating-image-panel";
import Menu from "../ui-components/menu";
import { ObjectDetected } from "../interfaces/detect-object";
import ReturnButton from "../ui-components/return-button";
import ViewMoreWindow from "../ui-components/view-more-window";

interface InterfaceLayouyt {
  showPanelObjectDetected?: boolean;
  showReturnButton?: boolean;
  objectDetected?: ObjectDetected | null;
  children: React.ReactNode;
  goView: (objectDetected: ObjectDetected) => void;
  returnView: () => void;
  currentObject?: ObjectDetected
}

function InterfaceLayout({
  children,
  currentObject,
  showPanelObjectDetected,
  showReturnButton,
  objectDetected,
  goView,
  returnView,
}: InterfaceLayouyt) {
  return (
    <main className="w-full h-screen relative">
      <div className="w-full h-screen ">{children}</div>

      {showReturnButton && <ReturnButton onClick={returnView} />}

      {showPanelObjectDetected && !!objectDetected && (
        <ViewMoreWindow
          label={objectDetected.label}
          onViewMore={() => goView(objectDetected)}
        />
      )}

      {currentObject?.type === "object" && showReturnButton && <FloatingImagePanel />}
      <Menu />
    </main>
  );
}

export default InterfaceLayout;
