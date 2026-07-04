import Link from "next/link";

interface CardProps {
  title: string;
  srcImage: string;
  altImage: string;
}

function Card({ title, srcImage, altImage }: CardProps) {
  return (
    <div
      className="flex flex-col max-w-96 relative overflow-hidden text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none w-full h-[300px] col-span-12 sm:col-span-7 min-w-72"
      tabIndex={-1}
    >
      <img
        src={srcImage}
        className="relative opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large z-0 w-full h-full object-cover"
        alt={altImage}
        data-loaded="true"
      />
      <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large backdrop-blur backdrop-saturate-150 absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col">
            <h4 className="text-md text-white">{title}</h4>
          </div>
        </div>
        <Link href="/ethnic-group/shuar">
          <button
            type="button"
            tabIndex={0}
            className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-3 min-w-16 h-8 text-tiny gap-2 rounded-full [&amp;>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-default text-default-foreground data-[hover=true]:opacity-hover"
          >
            Visitar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
