import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * @param {string} slug       "newbie" | "portrait" | …
 * @param {string} to         URL, куди веде картка  ("/lessons/newbie")
 * @param {string} imgSrc     Шлях до картинки
 * @param {string} title      Alt-текст / підпис
 */
export default function LessonCard({ slug, to, imgSrc, title }) {
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    setWatched(localStorage.getItem(`watched-${slug}`) === '1');
  }, [slug]);

  const toggle = () => {
    const next = !watched;
    setWatched(next);
    localStorage.setItem(`watched-${slug}`, next ? '1' : '0');
  };

  return (
    <div className="relative w-44 h-44 rounded-xl overflow-hidden shadow-lg">
      <Link to={to}>
        <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
      </Link>

      <button
        onClick={toggle}
        className={`absolute bottom-0 left-0 w-full py-1 text-sm font-semibold 
          ${watched ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-800'}
          hover:opacity-90 transition`}
      >
        {watched ? 'Переглянуто' : 'Не переглянуто'}
      </button>
    </div>
  );
}
