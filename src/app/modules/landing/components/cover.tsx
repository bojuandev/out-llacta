"use client";

function Cover() {
  return (
    <div className="relative w-full h-full hidden md:block">
      {/* Shuar Photo */}
      <img
        className="absolute rounded-3xl top-0 right-1/4 h-56 lg:h-72 shadow-2xl shadow-black/20 object-cover animate-fade-in-up animate-float"
        style={{ animationDelay: "0.3s" }}
        src="/images/shuar-photo.webp"
        alt="Cultura Shuar"
      />

      {/* Robot Photo */}
      <img
        className="absolute rounded-3xl bottom-8 left-1/4 h-48 lg:h-64 shadow-2xl shadow-black/20 object-cover animate-fade-in-up animate-float-slow"
        style={{ animationDelay: "0.5s" }}
        src="/images/robot-2.webp"
        alt="Tour Virtual 3D"
      />

      {/* Decorative floating elements */}
      <div
        className="absolute top-1/4 right-8 w-3 h-3 rounded-full bg-blue-400/50 animate-pulse-dot"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-1/3 right-1/3 w-2 h-2 rounded-full bg-yellow-400/50 animate-pulse-dot"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-8 w-2.5 h-2.5 rounded-full bg-red-400/40 animate-pulse-dot"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}

export default Cover;
