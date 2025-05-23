import React from 'react';

const ProgressPage = () => {
  const courses = [
    { title: 'Основи фотографії (Newbie)', progress: 80 },
    { title: 'Портретна зйомка',          progress: 45 },
    { title: 'Пейзажна фотографія',       progress: 65 },
    { title: 'Натюрморт',                 progress: 30 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-center text-2xl font-bold mt-8">
        Список пройдених уроків
      </h1>

      <main className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Мій навчальний прогрес
        </h2>
        <p className="text-gray-600">
          Вітаємо! Тут ви можете бачити свій прогрес у навчанні. Продовжуйте
          навчання, щоб досягти майстерності!
        </p>

        <section>
          <h3 className="text-lg font-bold mb-4">Список курсів</h3>

          {courses.map(({ title, progress }) => (
            <div key={title} className="space-y-1 mb-4">
              <p className="font-semibold">{title}</p>
              <div className="w-full bg-gray-300 rounded overflow-hidden h-5">
                <div
                  className="bg-green-500 text-white text-xs text-center leading-5 h-full transition-all"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ProgressPage;
