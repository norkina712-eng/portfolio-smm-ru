import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import MobileDock from './MobileDock';

export default function Shell() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (location.pathname !== '/') return;
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = location.hash.slice(1);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="shell">
      <div className="shell__glow" aria-hidden="true" />
      <div className="shell__content">
        <TopBar />
        <Outlet />
        {!isHome && (
          <footer className="footer">
            <div className="section__wrap">Норкина Валерия · SMM-специалист · 2026</div>
          </footer>
        )}
        {isHome && <MobileDock />}
      </div>
    </div>
  );
}
