import React from 'react';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="https://github.com/kram1947/mathapp">GitHub</a>
          <a href="/topics">Topics</a>
          <a href="/assessments">Assessments</a>
        </nav>
        <p className="footer-text">StudyIB • Master Mathematics with Kanishka • IB Learning & Assessment</p>
      </div>
    </footer>
  );
}
