import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/constellation', label: 'Constellation' },
  { to: '/portal', label: 'Portal' },
];

export function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Ported from the original js/main.js — closes the mobile nav on route change
  // rather than relying on direct DOM manipulation, which fights React.
  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  return (
    <>
      <nav>
        <Link to="/" className="nav-logo">HATHOR<span>MINERAL INTELLIGENCE</span></Link>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={location.pathname === l.to ? 'active' : ''}>{l.label}</Link>
          ))}
          <Link to="/portal" className="btn-portal"><span className="dot" />Launch Platform</Link>
        </div>
        <button
          className={`hamburger${mobileOpen ? ' open' : ''}`}
          aria-label="Menu"
          onClick={() => {
            const next = !mobileOpen;
            setMobileOpen(next);
            document.body.style.overflow = next ? 'hidden' : '';
          }}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <Link to="/">Home</Link>
        {NAV_LINKS.map((l) => (
          <Link key={l.to} to={l.to} className={location.pathname === l.to ? 'active' : ''}>{l.label}</Link>
        ))}
        <Link to="/portal" className="btn-portal"><span className="dot" />Launch Platform</Link>
      </div>

      {children}

      <footer>
        <Link to="/" className="footer-logo">HATHOR</Link>
        <div className="footer-copy">&copy; 2026 Sans Mercantile Constellation. All rights reserved.</div>
        <div className="footer-links">
          <a href="mailto:hello@sansmercantile.com">Contact</a>
          <Link to="/capabilities">Capabilities</Link>
          <Link to="/constellation">Constellation</Link>
          <Link to="/portal">Portal Access</Link>
        </div>
      </footer>
    </>
  );
}
