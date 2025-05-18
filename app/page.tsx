import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-[85rem] mx-auto flex flex-col items-center px-4">
      <div className="h-screen flex flex-col-reverse md:flex-row gap-6 items-center py-10">
        <div className="w-auto md:w-2/5">
          <h1 className="block text-5xl text-center md:text-start font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
            Our <span className="text-blue-600">llacta</span>
          </h1>
          <p className="text-sm mt-2 text-center md:text-start">
            Descubre la Riqueza Étnica del Ecuador en una Experiencia Virtual
            Única
          </p>
          <div className="flex h-3 w-48 my-4 mx-auto md:mx-0" role="separator">
            <div className="w-2/3 bg-yellow-500"></div>
            <div className="w-1/3 bg-blue-500"></div>
            <div className="w-1/3 bg-red-500"></div>
          </div>
          <p className="mt-9 text-sm md:text-xl text-gray-500 dark:text-neutral-400">
            ¿Listo para explorar la asombrosa diversidad cultural del Ecuador?
            <br />
            Este tour virtual te abrirá las puertas a un universo de
            conocimiento y admiración.
          </p>
        </div>

        <div className="md:w-3/5">
          <img
            className="w-full rounded-3xl"
            src="/images/robot.webp"
            alt="Portada Image"
          />
        </div>
      </div>
      <section className="my-10 flex flex-col items-center gap-4">
        <h2 className="text-md text-center text-blue-600">
          Conoce sobre las Etnias ecuatorianas
        </h2>
        <p className="max-w-md text-4xl text-center font-semibold">
          Diviértete explorando en un Tour Virtual en 3D
        </p>
        <p className="max-w-xl text-center text-gray-500">
          Descubre la esencia de cada etnia ecuatoriana de una manera profunda y
          respetuosa de sus tradiciones, su vestimenta, su arquitectura y su
          conexión única con la tierra.
        </p>
      </section>
      <section className="w-full my-10 flex flex-col gap-4">
        <h3 className="text-4xl font-semibold">Etinas</h3>
        <div>
          <div>
            {/* Card */}
            <div
              className="flex flex-col max-w-96 relative overflow-hidden text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none w-full h-[300px] col-span-12 sm:col-span-7 min-w-72"
              tabIndex={-1}
            >
              <div className="flex p-3 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Your day your way
                </p>
                <h4 className="text-white/90 font-medium text-xl">
                  Etnia Shuar
                </h4>
              </div>
              <img
                src="/portada-out-llacta.webp"
                className="relative opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large z-0 w-full h-full object-cover"
                alt="Relaxing app background"
                data-loaded="true"
              />
              <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large backdrop-blur backdrop-saturate-150 absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">Etnia Amazonica</p>
                    <p className="text-tiny text-white/60">
                      Get a good night's sleep.
                    </p>
                  </div>
                </div>
                <Link href="/ethnic-group/shuar">
                  <button
                    type="button"
                    tabIndex={0}
                    className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-3 min-w-16 h-8 text-tiny gap-2 rounded-full [&amp;>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-default text-default-foreground data-[hover=true]:opacity-hover"
                  >
                    Ver
                  </button>
                </Link>
              </div>
            </div>
            {/* end card */}
          </div>
        </div>
      </section>
    </main>
  );
}
