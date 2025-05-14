"use-client";

import { Button } from "@heroui/react";
import { AngleLeftIcon } from "../icons/angle-left-icon";
import FloatingImagePanel from "../ui-components/floating-image-panel";
import Menu from "../ui-components/menu";
import { ObjectDetected } from "../interfaces/detect-object";

interface InterfaceLayouyt {
  showPanelObjectDetected?: boolean;
  showReturnButton?: boolean;
  objectDetected?: ObjectDetected | null;
  children: React.ReactNode;
  goView: ( objectDetected: ObjectDetected ) => void
}

function InterfaceLayout({
  children,
  showPanelObjectDetected,
  showReturnButton,
  objectDetected,
}: InterfaceLayouyt) {
  return (
    <main className="w-full h-screen relative">
      <div className="w-full h-screen ">{children}</div>

      <div className="absolute top-6 left-6 transform">
        <Button
          color="primary"
          variant="light"
          startContent={<AngleLeftIcon />}
        >
          Regresar
        </Button>
      </div>

      {showPanelObjectDetected && !!objectDetected && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 transform flex items-center gap-4 roundeds p-2 bg-slate-50">
          <span>{objectDetected.name}</span>
          <Button color="primary">Ver</Button>
        </div>
      )}

      {showReturnButton && <FloatingImagePanel />}
      <Menu />
    </main>
  );
}

export default InterfaceLayout;
