import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import BeginnerComp   from '../lessons/beginner';
import PortraitComp   from '../lessons/portrait';
import StillLifeComp  from '../lessons/still';
import LandscapeComp  from '../lessons/landscape';

import BeginnerLesson   from './lesson_pages/beginner_lesson';
import PortraitLesson   from './lesson_pages/portrait_lesson';
import StillLifeLesson  from './lesson_pages/still_lesson';
import LandscapeLesson  from './lesson_pages/landscape_lesson';

const lessons = [
  { slug: 'newbie', href: '/lessons/newbie', Comp: BeginnerComp, course: 'Основи фотографії (Newbie)' },
  { slug: 'portrait', href: '/lessons/portrait', Comp: PortraitComp, course: 'Портретна зйомка' },
  { slug: 'landscape', href: '/lessons/landscape', Comp: LandscapeComp, course: 'Пейзажна фотографія' },
  { slug: 'still', href: '/lessons/still', Comp: StillLifeComp, course: 'Натюрморт' },
];

function LessonsIndex() {
  const [watched, setWatched] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setWatched(userData.watchedLessons || {});
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggle = async (slug) => {
    if (!user) return;

    try {
      const newWatched = { ...watched, [slug]: !watched[slug] };
      setWatched(newWatched);

      // Update watched lessons in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        watchedLessons: newWatched
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      alert('Помилка при оновленні прогресу');
    }
  };

  const renderCard = (slug, href, Comp) => (
    <div key={slug} className="relative">
      <Link to={href}>
        <Comp />
      </Link>

      <button
        onClick={() => toggle(slug)}
        className={`absolute bottom-1 right-1 px-2 py-[2px] text-xs rounded
          ${watched[slug] ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-800'}`}
      >
        {watched[slug] ? '✓' : '—'}
      </button>
    </div>
  );

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
        <p className="text-xl">Будь ласка, увійдіть в систему для перегляду уроків</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-center text-2xl font-bold mt-8">
        Доступні уроки
      </h1>

      <main className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map(({ slug, href, Comp }) => renderCard(slug, href, Comp))}
      </main>
    </div>
  );
}

export default function Lessons_Page() {
  return (
    <Routes>
      <Route index element={<LessonsIndex />} />
      <Route path="newbie" element={<BeginnerLesson />} />
      <Route path="portrait" element={<PortraitLesson />} />
      <Route path="still" element={<StillLifeLesson />} />
      <Route path="landscape" element={<LandscapeLesson />} />
    </Routes>
  );
}
