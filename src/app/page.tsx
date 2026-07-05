import Link from "next/link";
import Cover from "./modules/landing/components/cover";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 relative bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-[85rem] w-full mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center">
        {/* Left Content - SEO Static HTML */}
        <div className="w-full md:w-2/5 flex flex-col items-center md:items-start text-center md:text-left z-10">
          {/* Logo + Title */}
          <div
            className="flex flex-col items-center md:items-start animate-fade-in-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            <img
              className="h-28 md:h-36 drop-shadow-lg"
              src="/our-llacta-logo.svg"
              alt="logo-our-llacta"
            />
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white leading-tight">
              Our <span className="text-blue-600">llacta</span>
            </h1>
          </div>

          {/* Separator */}
          <div
            className="flex h-1.5 w-48 my-5 mx-auto md:mx-0 rounded-full overflow-hidden animate-fade-in-up"
            style={{ animationDelay: "0.35s", animationFillMode: "both" }}
            role="separator"
          >
            <div className="w-1/3 bg-yellow-500" />
            <div className="w-1/3 bg-blue-600" />
            <div className="w-1/3 bg-red-500" />
          </div>

          {/* Tagline */}
          <p
            className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium tracking-wide uppercase animate-fade-in-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            Descubre la Riqueza Ancestral del Ecuador en una Experiencia Virtual
          </p>

          {/* Main Copy */}
          <p
            className="mt-6 text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed max-w-lg animate-fade-in-up"
            style={{ animationDelay: "0.55s", animationFillMode: "both" }}
          >
            Sumérgete en el latido ancestral de Ecuador. Cada rincón guarda una
            historia, cada etnia es un universo de sabiduría milenaria.
          </p>

          <p
            className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg animate-fade-in-up"
            style={{ animationDelay: "0.65s", animationFillMode: "both" }}
          >
            Aquí, la tierra habla, la selva canta y las tradiciones vivas te
            invitan a descubrir lo que ningún libro puede enseñarte.
          </p>

          {/* CTA Button */}
          <div
            className="mt-8 animate-fade-in-up"
            style={{ animationDelay: "0.8s", animationFillMode: "both" }}
          >
            <Link href="/ethnic-group/shuar">
              <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all hover:scale-105 hover:shadow-blue-500/50 overflow-hidden">
                <span className="relative z-10">Iniciar Recorrido Virtual</span>
                <svg
                  className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
            </Link>
          </div>

          {/* Credit */}
          <div
            className="mt-6 flex items-center gap-2 animate-fade-in-up"
            style={{ animationDelay: "0.95s", animationFillMode: "both" }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              by
            </span>
            <a
              href="https://bojuan.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img className="w-10" src="/bojuan-logo.svg" alt="bojuan.dev" />
            </a>
          </div>
        </div>

        {/* Right: Cover Images */}
        <div className="w-full md:w-3/5 h-[300px] md:h-[500px]">
          <Cover />
        </div>
      </div>

      {/* Minimal Footer */}
      <div
        className="absolute bottom-4 left-0 right-0 text-center animate-fade-in"
        style={{ animationDelay: "1.2s", animationFillMode: "both" }}
      >
        <p className="text-xs text-gray-400 dark:text-gray-600">
          © 2025 bojuanDev
        </p>
      </div>
    </main>
  );
}
