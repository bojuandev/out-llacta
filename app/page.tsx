import { Button } from "@heroui/react";

import Link from "next/link";

export default function Home() {
  return (
    <main className="m-auto max-w-5xl">
      <header className="mb-20 mt-12">
        <h1 className="text-3xl font-bold text-center">Our Llacta</h1>
      </header>
      <div className="flex justify-center">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="w-full max-h-80 object-cover rounded-t-lg"
              src="/portada-out-llacta.webp"
              alt="portada"
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Etnia shuar
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Conoce mas sobre la etnia Shuar con este Tour Virtual
            </p>
            <Link
              href="/ethnic-group/shuar"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ir al tour virtual
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
