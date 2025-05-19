function Cover() {
  return (
    <div className="relative w-full md:w-3/5 h-[400px] hidden md:block">
      <img
        className="absolute rounded-3xl top-0 md:-top-16 right-1/2 translate-x-1/2 md:translate-x-0 md:right-20 h-64 md:h-96"
        src="/images/shuar-photo.webp"
        alt="Portada Image"
      />
      <img
        className="absolute rounded-3xl bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-40 h-52 md:h-72"
        src="/images/robot-2.webp"
        alt="Portada Image"
      />
    </div>
  );
}

export default Cover;
