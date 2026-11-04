import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/topics">Topics</a>
          <a href="/assessments">Assessments</a>
        </nav>
      </div>
    </footer>
  );
}
