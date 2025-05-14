"use-client";
import { CircularProgress } from "@heroui/react";

interface LoadingScreenProps {
  showLoading: boolean;
}

function LoadingScreen({ showLoading }: LoadingScreenProps) {
  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center bg-gradient-to-r from-neutral-300 to-stone-400 transition-all ${
        showLoading ? "" : "opacity-0 hidden"
      }`}
    >
      <div className="flex flex-col h-full py-32">
        <div className="flex-1 flex justify-center">

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
        <div className="flex justify-center items-center gap-2">
          <span className="text-slate-50">by</span>{" "}
          <img className="w-12" src="/bojuan-logo.svg" alt="/bojuan.dev" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
