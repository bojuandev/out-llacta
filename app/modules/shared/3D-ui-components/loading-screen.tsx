"use-client";

interface LoadingScreenProps {
  showLoading: boolean;
}

function LoadingScreen({ showLoading }: LoadingScreenProps) {
  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transition-all ${
        showLoading ? "" : "opacity-0 hidden"
      }`}
    >
      <div className="flex flex-col h-full py-32">
        <div className="flex-1 flex flex-col justify-center items-center">
          <img
            className="h-24 animate-pulse duration-1000"
            src="/our-llacta-logo.svg"
            alt="logo-our-llacta"
          />
          <span className="text-blue-600 text-xl mt-4">Cargando...</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className="text-gray-500">by</span>{" "}
          <img className="w-12" src="/bojuan-logo.svg" alt="/bojuan.dev" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
