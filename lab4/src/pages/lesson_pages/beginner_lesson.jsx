export default function BeginnerLesson() {
  return (
    <div className="min-h-screen bg-gray-100">

      <h1 className="mt-8 text-center text-3xl md:text-4xl font-bold">
        Фотографія для початківців
      </h1>

      <div className="max-w-4xl mx-auto mt-6 px-4">
        <div className="relative overflow-hidden rounded-lg shadow-lg pb-[56.25%]">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/V7z7BAZdt2M?si=tHda_Pdg43HdvthQ"
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
