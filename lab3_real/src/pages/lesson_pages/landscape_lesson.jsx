export default function LandscapeLesson() {
  return (
    <div className="min-h-screen bg-gray-100">

      <h1 className="mt-8 text-center text-3xl md:text-4xl font-bold">
        Пейзажна фотографія
      </h1>

      <div className="max-w-5xl mx-auto mt-8 px-4">
        <div className="relative pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/chw8GxuW6N4?si=6hRCF2YCxel-W5tk"
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
