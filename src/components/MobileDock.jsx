import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'work', label: 'Кейсы' },
  { id: 'about', label: 'Обо мне' },
  { id: 'contact', label: 'Написать', cta: true },
];

export default function MobileDock() {
  const [active, setActive] = useState('work');

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -45% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="mobile-dock" aria-label="Быстрая навигация">
      {LINKS.map((link) => (
        <button
          key={link.id}
          type="button"
          className={`mobile-dock__btn${link.cta ? ' mobile-dock__btn--cta' : ''}${active === link.id && !link.cta ? ' mobile-dock__btn--active' : ''}`}
          onClick={() => (link.cta ? (window.location.href = 'mailto:norkina05@icloud.com') : scrollTo(link.id))}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
}
