import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { icon: '📚', value: 10, label: 'Assessments', colorClass: 'purple' },
  { icon: '📝', value: 251, label: 'Questions', colorClass: 'green' },
  { icon: '⏱', value: 625, label: 'Minutes', colorClass: 'amber' },
  { icon: '🎯', value: 'MYP4', label: 'Curriculum', colorClass: 'cyan' },
];

function StatCard({ icon, value, label, colorClass }) {
  const [display, setDisplay] = useState(typeof value === 'number' ? 0 : value);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof value !== 'number') return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = value;
          const duration = 1500;
          const step = target / (duration / 16);
          let current = 0;
          const update = () => {
            current += step;
            if (current < target) {
              setDisplay(Math.floor(current));
              requestAnimationFrame(update);
            } else {
              setDisplay(target);
            }
          };
          update();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-card" ref={ref}>
      <div className={`stat-icon ${colorClass}`}>{icon}</div>
      <div className={`stat-value ${colorClass}`}>{display}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="stats-section" aria-label="Platform statistics">
      <div className="stats-grid">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
    </section>
  );
}
