"use-client";

import { useEffect, useState } from "react";

import FloatingImagePanel from "../ui-components/floating-image-panel";
import Menu from "../ui-components/menu";
import { ObjectDetected } from "../interfaces/detect-object";
import ReturnButton from "../ui-components/return-button";
import ViewMoreWindow from "../ui-components/view-more-window";
import LoadingScreen from "../ui-components/loading-screen";

interface InterfaceLayouyt {
  showReturnButton?: boolean;
  objectDetected?: ObjectDetected | null;
  children: React.ReactNode;
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

  useEffect(() => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 1500);
  }, [currentObject]);

  return (
    <main className="w-full h-screen relative">
      <div className="w-full h-screen ">{children}</div>

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
          <div className="absolute left-10 md:left-40 bottom-10 md:bottom-full md:top-1/2 -translate-y-1/2 transform flex flex-col gap-2 p-2 max-w-80 md:max-w-96">
            <h2 className="text-4xl md:text-9xl text-slate-50">{currentObject.label}</h2>
            <p className="text-sm text-slate-50">
             {/*  {currentObject.objectData?.description ?? ""} */}
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda nemo deleniti sed placeat velit ipsa iusto repellendus atque dignissimos cupiditate ex dicta quaerat totam officiis id, qui molestiae. Voluptatibus, harum.
            </p>
          </div>
          <FloatingImagePanel />
        </>
      )}

      {currentObject?.type !== "object" && (
        <>
          <div className="absolute left-10 md:left-40 bottom-16 -translate-y-1/2 transform flex flex-col gap-2 p-2 max-w-96">
            <h2 className="text-2xl md:text-5xl text-slate-50">
              Panel {!currentObject ? "Principal" : currentObject.label}
            </h2>
            <p className="text-sm md:text-lg text-slate-50">
              Dirigete a {!currentObject ? "una puerta" : "un objeto"} para
              poder {!currentObject ? "ver sus objetos." : "verlo con detalle."}
            </p>
          </div>
        </>
      )}

      <div className="absolute bottom-8 right-8 flex justify-center gap-2 opacity-50">
        <span className="text-slate-50  text-shadow-lg shadow-slate-300">by</span>{" "}
        <a href="https://bojuan.dev" target="_blank">
          <img className="w-12 text-shadow-sm shadow-slate-300" src="/bojuan-logo.svg"  alt="/bojuan.dev" />
        </a>
      </div>
      <Menu />
    </main>
  );
}

export default InterfaceLayout;
