"use-client";

import { useEffect, useState } from "react";
import { Alert } from "@heroui/alert";

import FloatingImagePanel from "../ui-components/floating-image-panel";
import Menu from "../ui-components/menu";
import { ObjectDetected } from "../interfaces/detect-object";
import ReturnButton from "../ui-components/return-button";
import ViewMoreWindow from "../ui-components/view-more-window";
import LoadingScreen from "../ui-components/loading-screen";

interface InterfaceLayouyt {
  showReturnButton?: boolean;
  objectDetected?: ObjectDetected | null;
  children: (loading: boolean) => React.ReactNode;
  goView: (objectDetected: ObjectDetected) => void;
  returnView: () => void;
  currentObject?: ObjectDetected;
}

function InterfaceLayout({
  children,
  currentObject,
  showReturnButton,
  objectDetected,
  goView,
  returnView,
}: InterfaceLayouyt) {
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setShowLoading(true);
    setIsVisible(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 1500);

    setTimeout(() => {
      setIsVisible(false);
    }, 6000);
  }, [currentObject]);

  return (
    <main className="w-full h-screen relative">
      <div className="w-full h-screen ">{children(showLoading)}</div>

      <LoadingScreen showLoading={showLoading} />

      {showReturnButton && <ReturnButton onClick={returnView} />}

      {objectDetected && (
        <ViewMoreWindow
          label={objectDetected.label}
          onViewMore={() => goView(objectDetected)}
        />
      )}

      {currentObject?.type === "object" && showReturnButton && (
        <>
          <div className="absolute left-10 md:left-10 bottom-4 md:top-1/2 -translate-y-1/2 transform flex flex-col gap-2 p-2 max-w-80 md:max-w-96">
            <h2 className="text-4xl md:text-7xl text-slate-50">
              {currentObject.label}
            </h2>
            <p className="text-sm text-slate-50 overflow-y-scroll md:overflow-y-hidden max-h-32 md:max-h-none">
              {currentObject.objectData?.description}
            </p>
          </div>
          <FloatingImagePanel
            imagesList={currentObject.objectData?.images ?? []}
          />
        </>
      )}

      {currentObject?.type !== "object" && (
        <>
          <div className="absolute top-20 left-1/2 -translate-x-1/2 transform w-[350px] md:w-96">
            <Alert
              description={` Dirigete a ${
                !currentObject ? "una puerta" : "un objeto"
              } para poder ${
                !currentObject ? "ver sus objetos." : "verlo con detalle."
              }`}
              title={`Panel ${
                !currentObject ? "Principal" : currentObject.label
              }`}
              isVisible={isVisible}
              variant="faded"
              onClose={() => setIsVisible(false)}
            />
          </div>
        </>
      )}

      <div className="absolute bottom-16 md:bottom-8 right-8 flex justify-center gap-2 opacity-50">
        <span className="text-slate-50  text-shadow-lg shadow-slate-300">
          by
        </span>{" "}
        <a href="https://bojuan.dev" target="_blank">
          <img
            className="w-12 text-shadow-sm shadow-slate-300"
            src="/bojuan-logo.svg"
            alt="/bojuan.dev"
          />
        </a>
      </div>
      <Menu />
    </main>
  );
}

export default InterfaceLayout;
