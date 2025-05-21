import React, { useState } from "react";
import "../styles/styles.css";


// Зменшує <img> у 2 рази та повертає dataURL
function resizeImage(img, quality = 0.8, scale = 0.5) {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth * scale;
  canvas.height = img.naturalHeight * scale;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}



function Gallery_Page() {

  const [preview, setPreview] = useState([]); // [{url, file}]


  const [imgType, setImgType] = useState("Портрет");


  const [filterType, setFilterType] = useState("all");


  const [stored, setStored] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("images")) || [];
    } catch {
      return [];
    }
  });


  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setPreview((prev) => [...prev, ...mapped]);
    e.target.value = "";
  };


  const uploadImages = () => {
    if (preview.length === 0) {
      alert("Немає зображень для завантаження!");
      return;
    }

    const next = [...stored];

    preview.forEach(({ url }) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const resized = resizeImage(img);
        next.push({
          src: resized,
          type: imgType,
          width: img.naturalWidth * 0.5,
          height: img.naturalHeight * 0.5
        });
        if (next.length === stored.length + preview.length) {
          localStorage.setItem("images", JSON.stringify(next));
          setStored(next);
          setPreview([]);
          const uploadMsg = document.getElementById("uploadMsg");
          uploadMsg.textContent = `Додано ${preview.length} фото типу «${imgType}»`;
        }
      };
    });
  };

  const deleteAllPhotos = () => {
    if (stored.length === 0) return;
    localStorage.clear();
    setStored([]);
  };

  const grouped = stored.reduce((acc, img) => {
    if (filterType !== "all" && img.type !== filterType) return acc;
    acc[img.type] = acc[img.type] || [];
    acc[img.type].push(img);
    return acc;
  }, {});

  return (
    <>
      <h1 className="text-3xl font-semibold text-center text-gray-800 my-12">
        Тут показуються всі ваші завантажені фотографії
      </h1>

      <section className="max-w-xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-600 mb-6 text-center tracking-wide">
          Завантаження фотографій
        </h2>

        <div className="flex flex-col items-center gap-6">
          <input
            type="file"
            id="addImageInput"
            multiple
            hidden
            onChange={handleFileSelect}
          />

          <div className="flex gap-3">
            <button
              className="px-5 py-2 bg-gray-900/90 text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-200 hover:scale-105"
              onClick={() => document.getElementById("addImageInput").click()}
            >
              Додати зображення
            </button>

            <button
              className="px-5 py-2 bg-gray-900/90 text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-200 hover:scale-105"
              onClick={uploadImages}
            >
              Завантажити
            </button>
          </div>

          <div className="w-full max-w-xs">
            <label
              htmlFor="imageType"
              className="block text-sm font-medium text-gray-500 mb-2 tracking-wide"
            >
              Тип фотографії
            </label>
            <select
              id="imageType"
              value={imgType}
              onChange={(e) => setImgType(e.target.value)}
              className="w-full px-4 py-2 bg-white/80 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="Портрет">Портрет</option>
              <option value="Пейзаж">Пейзаж</option>
              <option value="Макро">Макро</option>
            </select>
          </div>
        </div>

        {preview.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {preview.map(({ url }, idx) => (
              <img
                key={idx}
                src={url}
                alt="preview"
                className="h-40 w-auto rounded-lg shadow"
              />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-600 mb-6 text-center tracking-wide">
          Перегляд фотографій
        </h2>

        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-xs">
            <label htmlFor="filterType" className="block text-sm font-medium text-gray-500 mb-2 tracking-wide">
              Фільтр за типом
            </label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 bg-white/80 text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="all">Всі фотографії</option>
              <option value="Портрет">Портрет</option>
              <option value="Пейзаж">Пейзаж</option>
              <option value="Макро">Макро</option>
            </select>
          </div>
        </div>

        {Object.keys(grouped).length === 0 ? (
          <p className="text-center text-gray-600 text-xl mt-8">Немає фотографій обраного типу</p>
        ) : (
          Object.entries(grouped).map(([type, images]) => (
            <div key={type} className="w-full max-w-7xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-xl border border-gray-200">
              <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8 decoration-blue-400">
                {type}
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.src}
                    alt={type}
                    className="h-auto w-auto max-w-xs rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      <section className="max-w-xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-600 mb-6 text-center tracking-wide">Управління галереєю</h2>
        <div className="flex justify-center">
          <button
            className="px-5 py-2 bg-red-500/90 text-white font-medium rounded-xl hover:bg-red-600 transition-all duration-200 hover:scale-105"
            onClick={deleteAllPhotos}
          >
            Видалити всі фотографії
          </button>
        </div>
      </section>

      <div id="uploadMsg" className="flex justify-center mt-6" />
    </>
  );
}

export default Gallery_Page;
