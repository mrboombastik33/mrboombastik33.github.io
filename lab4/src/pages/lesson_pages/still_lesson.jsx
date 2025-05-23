export default function StillLifeLesson() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="mt-8 text-center text-3xl md:text-4xl font-bold">
        Фотографія продуктів та їжі
      </h1>

      <div className="max-w-5xl mx-auto mt-8 px-4">
        <div className="relative pb-[56.25%] overflow-hidden rounded-lg shadow-lg">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/tgymaO3ZEXc?si=YEe-OKA0yZcPrRTj"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
}

