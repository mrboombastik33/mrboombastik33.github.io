import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

import BeginnerComp   from '../lessons/beginner';
import PortraitComp   from '../lessons/portrait';
import StillLifeComp  from '../lessons/still';
import LandscapeComp  from '../lessons/landscape';

import BeginnerLesson   from './lesson_pages/beginner_lesson';
import PortraitLesson   from './lesson_pages/portrait_lesson';
import StillLifeLesson  from './lesson_pages/still_lesson';
import LandscapeLesson  from './lesson_pages/landscape_lesson';


function LessonsIndex() {
  const [watched, setWatched] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('watched')) || {};
    } catch {
      return {};
    }
  });

  const toggle = slug =>
    setWatched(prev => {
      const next = { ...prev, [slug]: !prev[slug] };
      localStorage.setItem('watched', JSON.stringify(next));
      return next;
    });

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

  return (
    <div className="p-6">
      <h1 className="text-center text-2xl font-bold mb-6">Уроки фотографії</h1>

      <nav className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
        {renderCard('newbie',    '/lessons/newbie',    BeginnerComp)}
        {renderCard('portrait',  '/lessons/portrait',  PortraitComp)}
        {renderCard('still',     '/lessons/still',     StillLifeComp)}
        {renderCard('landscape', '/lessons/landscape', LandscapeComp)}
      </nav>
    </div>
  );
}


export default function Lessons_Page() {
  return (
    <Routes>
      <Route index element={<LessonsIndex />} />

      <Route path="newbie"    element={<BeginnerLesson />} />
      <Route path="portrait"  element={<PortraitLesson />} />
      <Route path="still"     element={<StillLifeLesson />} />
      <Route path="landscape" element={<LandscapeLesson />} />
    </Routes>
  );
}
