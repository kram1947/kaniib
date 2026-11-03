import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../sections/SiteFooter';

const timelineMeta = {
  unit: 'math 26/27 Unit 2: Quadratic models',
  subject: 'Standard Mathematics',
  grade: 'Grade 10',
  template: 'Standard',
  duration: '6 Weeks',
  startDate: 'Week 3, October',
  lastUpdated: 'Sep 22, 2026',
  updatedBy: 'Wilhelm Tunemyr',
};

const milestones = [
  {
    week: 1,
    title: 'Quadratic Foundations',
    subtitle: 'Parabolas, vertex & axis of symmetry',
    date: 'Oct Week 3',
    status: 'current',
  },
  {
    week: 2,
    title: 'Forms of a Quadratic',
    subtitle: 'Standard, factored & vertex form',
    date: 'Oct Week 4',
    status: 'upcoming',
  },
  {
    week: 3,
    title: 'Solving Quadratics',
    subtitle: 'Factorising, completing the square, quadratic formula',
    date: 'Nov Week 1',
    status: 'upcoming',
  },
  {
    week: 4,
    title: 'Discriminant & Roots',
    subtitle: 'Discriminant reasoning, complex conjugate roots',
    date: 'Nov Week 2',
    status: 'upcoming',
  },
  {
    week: 5,
    title: 'Quadratic Models',
    subtitle: 'Projectile & revenue models, real-world application',
    date: 'Nov Week 3',
    status: 'upcoming',
  },
  {
    week: 6,
    title: 'Review & Assessment',
    subtitle: 'End-of-unit review and timed assessment',
    date: 'Nov Week 4',
    status: 'upcoming',
  },
];

function MilestoneItem({ milestone, index, total }) {
  const progress = ((milestone.week - 1) / (total - 1)) * 100;
  const isCurrent = milestone.status === 'current';
  const isUpcoming = milestone.status === 'upcoming';
  const isPast = milestone.status === 'past';
  const side = index % 2 === 0 ? 'top' : 'bottom';

  return (
    <div className="timeline-item" data-week={milestone.week}>
      <div className="timeline-line" />
      <div
        className={`timeline-dot ${isCurrent ? 'current' : isPast ? 'past' : 'upcoming'}`}
        style={{ left: `${progress}%` }}
        aria-label={`Week ${milestone.week}: ${milestone.title}`}
      />
      <div className={`timeline-content side-${side}`}>
        <div className="timeline-week">Week {milestone.week}</div>
        <h4 className="timeline-title">{milestone.title}</h4>
        <p className="timeline-subtitle">{milestone.subtitle}</p>
        <div className="timeline-meta">
          <span className="timeline-date">{milestone.date}</span>
          <span className={`timeline-status ${milestone.status}`}>
            {milestone.status === 'current' ? 'In progress' : milestone.status === 'past' ? 'Completed' : 'Upcoming'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function StudyTimeline() {
  const [activeWeek, setActiveWeek] = useState(1);

  return (
    <div>
      <Navbar />
      <main className="container" style={{ paddingTop: '24px', paddingBottom: '80px' }}>
        <section className="timeline-page">
          <div className="timeline-header">
            <div className="timeline-badge">
              <span className="badge-dot"></span>
              <span>Study Timeline</span>
            </div>
            <h1>{timelineMeta.unit}</h1>
            <p className="timeline-desc">
              A 6-week study and assessment plan for Standard Mathematics, Grade 10.
              Track milestones week by week as you work through the Quadratic models unit.
            </p>
          </div>

          <div className="timeline-meta-grid">
            <div className="meta-card">
              <div className="meta-label">Unit Template</div>
              <div className="meta-value">{timelineMeta.template}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Subjects</div>
              <div className="meta-value">{timelineMeta.subject}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Grade</div>
              <div className="meta-value">{timelineMeta.grade}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Start date</div>
              <div className="meta-value">{timelineMeta.startDate}</div>
            </div>
            <div className="meta-card">
              <div className="meta-label">Duration</div>
              <div className="meta-value">{timelineMeta.duration}</div>
            </div>
            <div className="meta-card wide">
              <div className="meta-label">Last updated</div>
              <div className="meta-value">
                {timelineMeta.lastUpdated} by {timelineMeta.updatedBy}
              </div>
            </div>
          </div>

          <div className="timeline-chart">
            <svg className="timeline-axis" aria-hidden="true" />
            {milestones.map((m, i) => (
              <MilestoneItem
                key={m.week}
                milestone={m}
                index={i}
                total={milestones.length}
              />
            ))}
          </div>

          <div className="timeline-weekly-focus">
            <h2>Week {activeWeek} Focus</h2>
            <div className="weekly-focus-card">
              <div className="focus-title">{milestones[activeWeek - 1].title}</div>
              <div className="focus-subtitle">{milestones[activeWeek - 1].subtitle}</div>
              <div className="focus-schedule">
                <span className="focus-label">Scheduled</span>
                <span className="focus-date">{milestones[activeWeek - 1].date}</span>
              </div>
              <div className="focus-actions">
                <button className="btn btn-outline" onClick={() => setActiveWeek(((activeWeek - 2 + milestones.length) % milestones.length) + 1)}>
                  ← Previous
                </button>
                <button className="btn btn-outline" onClick={() => setActiveWeek((activeWeek % milestones.length) + 1)}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
