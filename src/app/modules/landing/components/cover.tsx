"use client";

function Cover() {
  return (
    <div className="relative w-full h-full flex items-center justify-center md:justify-end">
      {/* Mobile: Shuar and Robot overlapping */}
      <div className="md:hidden relative w-full h-full">
        <div className="absolute top-2 left-1/2 -translate-x-1/3 animate-fade-in">
          <img
            className="rounded-2xl h-36 w-auto shadow-xl shadow-black/20 object-cover animate-float"
            src="/images/shuar-photo.webp"
            alt="Cultura Shuar"
          />
        </div>
        <div className="absolute bottom-8 left-1/4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <img
            className="rounded-2xl h-28 w-auto object-cover animate-float"
            src="/images/robot-2.webp"
            alt="Tour Virtual 3D"
          />
        </div>
      </div>

      {/* Desktop: overlapping composition */}
      <div className="hidden md:block relative w-full h-full max-w-xl mx-auto">
        {/* Shuar Photo - upper area, slightly right */}
        <div className="absolute top-4 left-1/2 -translate-x-1/4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <img
            className="rounded-3xl h-80 lg:h-96 w-auto shadow-2xl shadow-black/20 object-cover animate-float"
            src="/images/shuar-photo.webp"
            alt="Cultura Shuar"
          />
        </div>

        {/* Robot Photo - lower area, slightly left */}
        <div className="absolute bottom-16 left-1/2 -translate-x-3/4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <img
            className="rounded-3xl h-64 lg:h-72 w-auto object-cover animate-float-slow"
            src="/images/robot-2.webp"
            alt="Tour Virtual 3D"
          />
        </div>

        {/* Decorative floating dots */}
        <div
          className="absolute top-12 right-8 w-3 h-3 rounded-full bg-blue-400/50 animate-pulse-dot"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-1/3 right-16 w-2 h-2 rounded-full bg-yellow-400/50 animate-pulse-dot"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-4 w-2.5 h-2.5 rounded-full bg-red-400/40 animate-pulse-dot"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  );
}

export default Cover;
