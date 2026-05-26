import React from 'react';

const features = [
  { icon: '📊', title: 'Track Progress', desc: 'Detailed performance analysis shows your strengths and areas for improvement after each assessment.' },
  { icon: '⏱', title: 'Timed Practice', desc: 'Build exam stamina with realistic time limits. The timer helps you manage your pace effectively.' },
  { icon: '📥', title: 'PDF Reports', desc: 'Download comprehensive result reports with personalized study plans to guide your revision.' },
];

export default function FeaturesSection() {
  return (
    <section className="features-section" aria-labelledby="features-title">
      <div className="section-header">
        <h2 id="features-title">Why Choose KaniMath?</h2>
        <p>Designed to help you succeed</p>
      </div>
      <div className="features-grid">
        {features.map(f => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
