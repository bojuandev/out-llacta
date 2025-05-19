import Link from "next/link";
import Cover from "./modules/landing/components/cover";
import Card from "./modules/shared/components-ui/card";

export default function Home() {
  return (
    <main className="max-w-[85rem] mx-auto flex flex-col items-center px-4">
      <div className="h-screen w-full flex flex-col justify-center md:flex-row gap-6 items-center py-10">
        <div className="w-auto md:w-2/5">
          <div className="flex flex-col justify-center items-center">
            <img
              className="h-36"
              src="/our-llacta-logo.svg"
              alt="logo-our-llacta"
            />
            <h1 className="block text-5xl text-center md:text-start font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
              Our <span className="text-blue-600">llacta</span>
            </h1>
          </div>
          <p className="text-sm mt-2 text-center">
            Descubre la Riqueza Étnica del Ecuador en una Experiencia Virtual
            Única
          </p>
          <div className="flex h-3 w-48 my-4 mx-auto" role="separator">
            <div className="w-2/3 bg-yellow-500"></div>
            <div className="w-1/3 bg-blue-500"></div>
            <div className="w-1/3 bg-red-500"></div>
          </div>
          <p className="mt-9 text-md md:text-xl text-gray-800 dark:text-neutral-400 text-center">
            ¿Listo para explorar la asombrosa diversidad cultural del Ecuador?
            Este tour virtual te abrirá las puertas a un universo de
            conocimiento y admiración.
          </p>
        </div>
        <Cover />
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
        {/* <h3 className="text-4xl font-semibold text-blue-600">Etinas</h3> */}
        <div className="grid justify-center">
          <Card
            title="Etnia Shuar"
            srcImage="/images/shuar-photo.webp"
            altImage="Shuar"
          />
        </div>
      </section>
    </main>
  );
}
