import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { id: 'work', label: 'Кейсы' },
  { id: 'about', label: 'Обо мне' },
  { id: 'skills', label: 'Навыки' },
  { id: 'contact', label: 'Контакты' },
];

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('work');
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const goTo = (id) => {
    setMenuOpen(false);
    if (!isHome) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`topbar${scrolled ? ' topbar--scrolled' : ''}`}>
      <div className="topbar__inner">
        <Link to="/" className="topbar__logo">
          Норкина Валерия
        </Link>

        {isHome ? (
          <>
            <nav className={`topbar__nav${menuOpen ? ' topbar__nav--open' : ''}`}>
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className={`topbar__link${active === link.id ? ' topbar__link--active' : ''}`}
                  onClick={() => goTo(link.id)}
                >
                  {link.label}
                </button>
              ))}
              <Link to="/print" className="topbar__link topbar__link--pdf">
                PDF
              </Link>
            </nav>
          </>
        ) : (
          <>
            <Link to="/print" className="topbar__link topbar__link--pdf topbar__cta--desktop">
              PDF
            </Link>
            <Link to="/#work" className="topbar__cta topbar__cta--desktop">
              ← На главную
            </Link>
          </>
        )}

        {isHome && (
          <button
            type="button"
            className={`topbar__burger${menuOpen ? ' topbar__burger--open' : ''}`}
            aria-label="Меню"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        )}
      </div>
    </header>
  );
}
