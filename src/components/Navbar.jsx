import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <Link to="/" className="navbar-brand">M10</Link>

      <button
        className="navbar-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        <span className={`hamburger ${mobileOpen ? 'open' : ''}`}></span>
      </button>

      <div className={`navbar-links ${mobileOpen ? 'visible' : ''}`}>
        <NavLink to="/assessments" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMobileOpen(false)}>
          Assessments
        </NavLink>
        <NavLink to="/topics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMobileOpen(false)}>
          Topics
        </NavLink>
        <NavLink to="/features" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMobileOpen(false)}>
          Features
        </NavLink>
        <NavLink to="/study-timeline" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMobileOpen(false)}>
          Study Timeline
        </NavLink>
        <NavLink to="/study-timeline/chemistry" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setMobileOpen(false)}>
          Chemistry Timeline
        </NavLink>
      </div>
    </nav>
  );
}
