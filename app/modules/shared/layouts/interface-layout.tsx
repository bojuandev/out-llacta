"use-client";

import { CircularProgress } from "@heroui/react";
import FloatingImagePanel from "../ui-components/floating-image-panel";
import Menu from "../ui-components/menu";
import { ObjectDetected } from "../interfaces/detect-object";
import ReturnButton from "../ui-components/return-button";
import ViewMoreWindow from "../ui-components/view-more-window";
import { useEffect, useState } from "react";

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
    }, 2000);
  }, [currentObject]);

  return (
    <main className="w-full h-screen relative">
      <div className="w-full h-screen ">{children}</div>
      <div
        className={`absolute z-10 top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600 transition-all ${
          showLoading ? "" : "opacity-0 hidden"
        }`}
      >
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
            label: "text-white text-xl mt-4",
          }}
          label="Cargando..."
        />
      </div>

      {showReturnButton && <ReturnButton onClick={returnView} />}

      { objectDetected && (
        <ViewMoreWindow
          label={objectDetected.label}
          onViewMore={() => goView(objectDetected)}
        />
      )}

      {currentObject?.type === "object" && showReturnButton && (
        <>
          <div className="absolute left-40 top-1/2 -translate-y-1/2 transform flex flex-col gap-2 p-2 max-w-72">
            <h2 className="text-9xl text-slate-50">{currentObject.label}</h2>
            <p className="text-sm text-slate-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              voluptatibus molestias optio veritatis eos, aut, repellendus,
              corrupti culpa at voluptate commodi illum. Consectetur asperiores
              culpa nam nisi consequatur expedita quis?
            </p>
          </div>
          <FloatingImagePanel />
        </>
      )}
      <Menu />
    </main>
  );
}

export default InterfaceLayout;
