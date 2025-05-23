import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const defaultCourses = [
  { title: 'Основи фотографії (Newbie)', watched: false },
  { title: 'Портретна зйомка', watched: false },
  { title: 'Пейзажна фотографія', watched: false },
  { title: 'Натюрморт', watched: false },
];

const courseSlugs = {
  'Основи фотографії (Newbie)': 'newbie',
  'Портретна зйомка': 'portrait',
  'Пейзажна фотографія': 'landscape',
  'Натюрморт': 'still',
};

const ProgressPage = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUser = () => {};
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        unsubscribeUser = onSnapshot(userDocRef, (userDoc) => {
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
          setLoading(false);
        });
      } else {
        setUserData(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribeAuth();
      unsubscribeUser();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <p className="text-xl">Завантаження...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <p className="text-xl">Будь ласка, увійдіть в систему для перегляду прогресу</p>
      </div>
    );
  }

  const watchedLessons = userData?.watchedLessons || {};
  const courses = defaultCourses.map(course => ({
    ...course,
    watched: !!watchedLessons[courseSlugs[course.title]]
  }));

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

          {courses.map(({ title, watched }) => (
            <div key={title} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
              <p className="font-semibold">{title}</p>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                watched ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {watched ? 'Пройдено' : 'Не пройдено'}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ProgressPage;
