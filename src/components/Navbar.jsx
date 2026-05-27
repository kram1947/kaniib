import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { session, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <Link to="/" className="navbar-brand">StudyIB</Link>

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
        <div className="navbar-user">
          <span className="navbar-username">{session?.user?.username}</span>
          <button className="navbar-logout" type="button" onClick={signOut}>Log out</button>
        </div>
      </div>
    </nav>
  );
}
