import React from 'react';
import { Link } from 'react-router-dom';

export default function PortraitLesson() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/lessons"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Назад до уроків
        </Link>

        <h1 className="text-3xl font-bold mb-6">
          Портретна зйомка
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="w-full mb-6">
            <iframe
              className="w-full rounded-lg"
              style={{ minHeight: 250, height: 450, maxHeight: 600 }}
              src="https://www.youtube.com/embed/qZUWdu2PnXg"
              title="Портретна зйомка"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Опис уроку</h2>
            <p className="text-gray-700 mb-4">
              У цьому уроці ви дізнаєтесь про секрети портретної фотографії:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Робота з моделлю</li>
              <li>Позирування</li>
              <li>Освітлення для портретів</li>
              <li>Композиція портретного кадру</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
