import { Button } from "@heroui/react";

import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 my-4">
      {/* <!-- Grid */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
        <div>
          <h1 className="block text-3xl font-bold text-black-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">
            Our <span className="text-blue-600">llacta</span>
          </h1>
          <p>
            Descubre la Riqueza Étnica del Ecuador en una Experiencia Virtual
            Única
          </p>
          <div className="flex h-3 w-48 my-4" role="separator">
            <div className="w-2/3 bg-yellow-500"></div>
            <div className="w-1/3 bg-blue-500"></div>
            <div className="w-1/3 bg-red-500"></div>
          </div>
          <p className="mt-9 text-xl text-gray-800 dark:text-neutral-400">
            ¿Listo para explorar la asombrosa diversidad cultural del Ecuador?
            Este tour virtual te abrirá las puertas a un universo de
            conocimiento y admiración.
          </p>
        </div>
        {/* <!-- End Col */}

        <div className="">
          <img
            className="w-full rounded-md"
            src="https://images.unsplash.com/photo-1665686377065-08ba896d16fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=800&q=80"
            alt="Hero Image"
          />
        </div>
        {/* <!-- End Col */}
      </div>
      {/* <!-- End Grid */}
    </main>
  );
}
