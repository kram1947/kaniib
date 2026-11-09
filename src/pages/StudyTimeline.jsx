import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../sections/SiteFooter';

const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const MONTH_COUNT = MONTHS.length;

const groups = [
  {
    id: 'math',
    name: 'Core Subject: Mathematics',
    color: '#ec4899',
    rows: [
      { name: 'Algebra & Linear Functions', start: 1, span: 3, note: 'Aug – Oct 2026: Linear Equations, Graphs & Inequalities' },
      { name: 'Quadratic Functions & Equations', start: 3, span: 3, note: 'Oct – Dec 2026: Factoring, Vertex Form & Quadratic Formula' },
      { name: 'Trigonometry & Spatial Geometry', start: 6, span: 3, note: 'Jan – Mar 2027: Sine/Cosine Rules & 3D Geometry' },
      { name: 'Statistics & Probability', start: 8, span: 2, note: 'Mar – Apr 2027: Bivariate Data & Compound Probability' },
    ],
  },
  {
    id: 'science',
    name: 'Core Subject: Integrated Sciences',
    color: '#14b8a6',
    rows: [
      { name: 'Physics: Motion, Forces & Kinematics', start: 1, span: 3, note: "Aug – Oct 2026: Speed, Acceleration & Newton's Laws" },
      { name: 'Chemistry: Bonding & Stoichiometry', start: 4, span: 3, note: 'Nov 2026 – Jan 2027: Periodic Table, Ionic/Covalent Bonding & Moles' },
      { name: 'Biology: DNA, Genetics & Inheritance', start: 6, span: 3, note: 'Jan – Mar 2027: DNA Structure, Mitosis/Meiosis & Punnett Squares' },
      { name: 'Energy Transformations & Rates', start: 8, span: 2, note: 'Mar – Apr 2027: Energy Conservation & Reaction Rates' },
    ],
  },
  {
    id: 'assessment',
    name: 'Assessments & IB MYP Milestones',
    color: '#f59e0b',
    rows: [
      { name: 'MYP Personal Project Report', start: 1, span: 7, note: 'Aug 2026 – Feb 2027: Drafting, Report Submission & Moderation' },
      { name: 'Science Criteria B & C Investigations', start: 2, span: 4, note: 'Sep – Dec 2026: Hands-on Lab Design and Data Analysis' },
      { name: 'Mock Examinations (On-Screen)', start: 6, span: 2, note: 'Jan – Feb 2027: Practice Exams for Math & Sciences' },
      { name: 'Final eAssessment Revision', start: 9, span: 1, note: 'Apr 2027: Intensive Exam Prep & Past Papers' },
      {
        name: 'Official IB MYP eAssessments (M27)',
        start: 10,
        span: 1,
        note: 'May 2027: Official External IB MYP On-Screen Examinations',
        color: '#6366f1',
        highlight: true,
      },
      { name: 'Final Results & DP Transition', start: 11, span: 1, note: 'Jun 2027: Course Completion & DP Preparation' },
    ],
  },
];

const FILTERS = [
  { id: 'all', label: 'Show All' },
  { id: 'math', label: 'Math' },
  { id: 'science', label: 'Science' },
  { id: 'assessment', label: 'Assessments' },
];

function GroupHeader({ group }) {
  return (
    <div className="m10-group-header">
      <div className="m10-group-title" style={{ background: group.color }}>
        <svg className="m10-group-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m-6 4h6m-6 4h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {group.name}
      </div>
      <div className="m10-month-grid-cell" />
    </div>
  );
}

function TimelineRow({ row }) {
  const left = ((row.start - 1) / MONTH_COUNT) * 100;
  const width = (row.span / MONTH_COUNT) * 100;
  const color = row.color || '#f59e0b';

  return (
    <div className={`m10-row${row.highlight ? ' highlight' : ''}`}>
      <div className="m10-row-label">
        {row.highlight && <span className="m10-pulse" aria-hidden="true" />}
        <span className={row.highlight ? 'm10-row-name highlight' : 'm10-row-name'}>{row.name}</span>
      </div>
      <div className="m10-row-track m10-month-grid-cell">
        <div
          className="m10-bar"
          style={{ left: `${left}%`, width: `${width}%`, background: color, color }}
          title={row.note}
          role="img"
          aria-label={row.note}
        />
      </div>
    </div>
  );
}

export default function StudyTimeline() {
  const [filter, setFilter] = useState('all');
  const visibleGroups = filter === 'all' ? groups : groups.filter((g) => g.id === filter);

  return (
    <div>
      <Navbar />
      <main className="container" style={{ paddingTop: '24px', paddingBottom: '80px' }}>
        <section className="m10-page">
          <div className="m10-card">
            <div className="m10-card-header">
              <div>
                <span className="m10-badge">Academic Year 2026 – 2027</span>
                <h1 className="m10-title">IB MYP 5 (Grade 10) Curriculum &amp; Assessment Timeline</h1>
                <p className="m10-subtitle">
                  Core Subject Units, Personal Project Milestones &amp; eAssessment Timelines
                </p>
              </div>
              <div className="m10-filters" role="group" aria-label="Filter timeline by category">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`m10-filter-btn${filter === f.id ? ' active' : ''}`}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="m10-scroll">
              <div className="m10-chart">
                <div className="m10-header-grid">
                  <div className="m10-header-label">Subject &amp; Topic Modules</div>
                  <div className="m10-months-col">
                    <div className="m10-semesters">
                      <div className="m10-semester">Semester 1 / Term 1</div>
                      <div className="m10-semester">Semester 2 / Term 2</div>
                    </div>
                    <div className="m10-months">
                      {MONTHS.map((m, i) => (
                        <div key={m} className={`m10-month${i === 9 ? ' peak' : ''}`}>
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="m10-body">
                  {visibleGroups.map((group) => (
                    <div key={group.id} className="m10-group">
                      <GroupHeader group={group} />
                      {group.rows.map((row) => (
                        <TimelineRow key={row.name} row={row} />
                      ))}
                    </div>
                  ))}
                  {visibleGroups.length === 0 && (
                    <div className="m10-empty">No modules in this category.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="m10-footer">
              <div className="m10-legend">
                <span className="m10-legend-title">Legend:</span>
                <span className="m10-legend-item">
                  <span className="m10-legend-dot" style={{ background: '#ec4899' }} /> Mathematics
                </span>
                <span className="m10-legend-item">
                  <span className="m10-legend-dot" style={{ background: '#14b8a6' }} /> Integrated Sciences
                </span>
                <span className="m10-legend-item">
                  <span className="m10-legend-dot" style={{ background: '#f59e0b' }} /> Internal Assessments &amp; Projects
                </span>
                <span className="m10-legend-item">
                  <span className="m10-legend-dot" style={{ background: '#6366f1' }} /> Official IB eAssessments (May 2027)
                </span>
              </div>
              <div className="m10-footer-note">IB MYP 5 Academic Year Schedule • M27 Session</div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
