import React from 'react';

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <div className="hero-badge">
          <span></span>
          Free IB Math Practice
        </div>
        <h1 id="hero-title">Master <span>Mathematics</span><br/>with Kanishka</h1>
        <p className="hero-desc">Interactive assessments aligned with IB MYP4 curriculum. Track your progress, identify knowledge gaps, and achieve excellence.</p>
        <div className="hero-actions">
          <a href="/assessments" className="btn btn-primary">
            Start Learning
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="/topics" className="btn btn-secondary">
            Browse Topics
          </a>
        </div>
      </div>
    </section>
  );
}
