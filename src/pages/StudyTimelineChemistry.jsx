import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../sections/SiteFooter';

const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const MONTH_COUNT = MONTHS.length;
const WEEKS_PER_MONTH = 4;
const TOTAL_WEEKS = MONTH_COUNT * WEEKS_PER_MONTH; // 44 grid weeks, Aug 2026 – Jun 2027

// The 20-week Chemistry unit starts in Week 3 of August (global grid week 3).
const UNIT_START = 3;
const UNIT_WEEKS = 20;
const toGlobal = (unitWeek) => unitWeek + UNIT_START - 1;

const unitMeta = {
  unit: '26/27 Unit - CHEMISTRY A: Matter',
  subject: 'Sciences',
  grade: 'Grade 10',
  duration: '20 Weeks',
  hours: '19 Hours',
  startDate: 'Week 3, August 2026',
};

const categories = [
  {
    id: 'concept',
    name: 'Concept Development',
    color: '#6366f1',
    tasks: [
      { id: 'c1', name: 'Nature of Matter & States of Matter', start: 1, end: 3, progress: 100 },
      { id: 'c2', name: 'Atomic Structure & Isotopes', start: 4, end: 7, progress: 100 },
      { id: 'c3', name: 'Electron Configuration & Orbitals', start: 8, end: 10, progress: 60 },
    ],
  },
  {
    id: 'system',
    name: 'System Design',
    color: '#10b981',
    tasks: [
      { id: 's1', name: 'Periodic Table & Periodic Trends', start: 11, end: 13, progress: 30 },
      { id: 's2', name: 'Chemical Bonding — Ionic & Covalent', start: 14, end: 16, progress: 0 },
      { id: 's3', name: 'Intermolecular Forces & Properties', start: 17, end: 18, progress: 0 },
    ],
  },
  {
    id: 'detail',
    name: 'Detail Design',
    color: '#f59e0b',
    tasks: [
      { id: 'd1', name: 'Chemical Reactions & Equations', start: 15, end: 17, progress: 0 },
      { id: 'd2', name: 'Stoichiometry & Mole Concept', start: 18, end: 20, progress: 0 },
    ],
  },
  {
    id: 'test',
    name: 'Test & Refine',
    color: '#ef4444',
    tasks: [
      { id: 't1', name: 'Acids, Bases & pH Calculations', start: 16, end: 18, progress: 0 },
      { id: 't2', name: 'Redox & Electrochemistry Basics', start: 19, end: 20, progress: 0 },
    ],
  },
  {
    id: 'produce',
    name: 'Produce',
    color: '#8b5cf6',
    tasks: [
      { id: 'p1', name: 'Internal Assessment — Chemistry', start: 14, end: 20, progress: 0 },
      { id: 'p2', name: 'Unit Review & Practice Papers', start: 19, end: 20, progress: 0 },
    ],
  },
  {
    id: 'other',
    name: 'Other',
    color: '#6b7280',
    tasks: [
      { id: 'o1', name: 'Exam Preparation & Revision', start: 18, end: 20, progress: 0 },
    ],
  },
];

const milestones = [
  { id: 'm1', label: 'Milestone 1', week: 7, date: 'Sep 18', title: 'Atomic Model Complete' },
  { id: 'm2', label: 'Milestone 2', week: 14, date: 'Oct 30', title: 'Bonding Mastery' },
  { id: 'm3', label: 'Milestone 3', week: 20, date: 'Dec 11', title: 'Stoichiometry Competency' },
];

const FILTERS = [
  { id: 'all', label: 'Show All' },
  ...categories.map((c) => ({ id: c.id, label: c.name })),
];

function monthOfWeek(globalWeek) {
  return Math.floor((globalWeek - 1) / WEEKS_PER_MONTH);
}

function weekOfMonth(globalWeek) {
  return ((globalWeek - 1) % WEEKS_PER_MONTH) + 1;
}

function globalRangeLabel(start, end) {
  const gs = toGlobal(start);
  const ge = toGlobal(end);
  return `${MONTHS[monthOfWeek(gs)]} W${weekOfMonth(gs)} – ${MONTHS[monthOfWeek(ge)]} W${weekOfMonth(ge)}`;
}

function GroupHeader({ group }) {
  return (
    <div className="m10-group-header">
      <div className="m10-group-title" style={{ background: group.color }}>
        <svg className="m10-group-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {group.name}
      </div>
      <div className="m10-month-grid-cell m10-week-grid-cell" />
    </div>
  );
}

function TaskRow({ task, color }) {
  const gs = toGlobal(task.start);
  const ge = toGlobal(task.end);
  const left = ((gs - 1) / TOTAL_WEEKS) * 100;
  const width = ((ge - gs + 1) / TOTAL_WEEKS) * 100;
  const progressWidth = (task.progress / 100) * width;
  const note = `${globalRangeLabel(task.start, task.end)} • Unit W${task.start}–W${task.end}${task.progress > 0 ? ` • ${task.progress}% complete` : ''}`;

  return (
    <div className="m10-row">
      <div className="m10-row-label">
        <span className="m10-row-name">{task.name}</span>
        {task.progress > 0 && <span className="m10-progress-chip">{task.progress}%</span>}
      </div>
      <div className="m10-row-track m10-month-grid-cell m10-week-grid-cell">
        <div
          className="m10-bar"
          style={{ left: `${left}%`, width: `${width}%`, background: color, color }}
          title={note}
          role="img"
          aria-label={note}
        >
          <div className="m10-bar-progress" style={{ width: `${progressWidth}%` }} />
        </div>
      </div>
    </div>
  );
}

function MilestonesLayer() {
  return (
    <div className="m10-row m10-milestone-row">
      <div className="m10-row-label">Milestones</div>
      <div className="m10-row-track m10-month-grid-cell m10-week-grid-cell">
        {milestones.map((m) => {
          const left = ((toGlobal(m.week) - 0.5) / TOTAL_WEEKS) * 100;
          return (
            <div
              key={m.id}
              className="m10-milestone"
              style={{ left: `${left}%` }}
              title={`${m.label}: ${m.title} (${m.date}) — Unit W${m.week}`}
            >
              <div className="m10-milestone-diamond" />
              <div className="m10-milestone-label">{m.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function StudyTimelineChemistry() {
  const [filter, setFilter] = useState('all');
  const [activeWeek, setActiveWeek] = useState(1);

  const visibleGroups = filter === 'all' ? categories : categories.filter((c) => c.id === filter);

  const allTasks = categories.flatMap((c) =>
    c.tasks.map((t) => ({ ...t, category: c.name, color: c.color }))
  );
  const currentTask = allTasks.find((t) => activeWeek >= t.start && activeWeek <= t.end);

  return (
    <div>
      <Navbar />
      <main className="container" style={{ paddingTop: '24px', paddingBottom: '80px' }}>
        <section className="m10-page">
          <div className="m10-card">
            <div className="m10-card-header">
              <div>
                <span className="m10-badge">Academic Year 2026 – 2027</span>
                <h1 className="m10-title">Week Schedule — {unitMeta.unit}</h1>
                <p className="m10-subtitle">
                  A {unitMeta.duration} ({unitMeta.hours}) {unitMeta.subject} plan for {unitMeta.grade},
                  starting {unitMeta.startDate}. Weeks are aligned to the Math &amp; Science curriculum
                  timelines (Aug 2026 – Jun 2027, 4 weeks per month).
                </p>
              </div>
              <div className="m10-filters" role="group" aria-label="Filter week schedule by category">
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
                  <div className="m10-header-label">Category &amp; Tasks</div>
                  <div className="m10-months-col">
                    <div className="m10-semesters m10-months-semesters">
                      {MONTHS.map((m) => (
                        <div key={m} className="m10-month-head">{m}</div>
                      ))}
                    </div>
                    <div className="m10-weeks">
                      {MONTHS.map((m, mi) =>
                        Array.from({ length: WEEKS_PER_MONTH }, (_, wi) => (
                          <div key={`${m}-${wi}`} className="m10-week-tick">
                            W{wi + 1}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="m10-body">
                  <MilestonesLayer />
                  {visibleGroups.map((group) => (
                    <div key={group.id} className="m10-group">
                      <GroupHeader group={group} />
                      {group.tasks.map((task) => (
                        <TaskRow key={task.id} task={task} color={group.color} />
                      ))}
                    </div>
                  ))}
                  {visibleGroups.length === 0 && (
                    <div className="m10-empty">No tasks in this category.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="m10-footer">
              <div className="m10-legend">
                <span className="m10-legend-title">Legend:</span>
                {categories.map((c) => (
                  <span key={c.id} className="m10-legend-item">
                    <span className="m10-legend-dot" style={{ background: c.color }} /> {c.name}
                  </span>
                ))}
              </div>
              <div className="m10-footer-note">Chemistry A: Matter • {unitMeta.duration} from {unitMeta.startDate}</div>
            </div>
          </div>

          <div className="timeline-weekly-focus">
            <h2>Unit Week {activeWeek} Focus</h2>
            <div className="weekly-focus-card">
              {currentTask ? (
                <>
                  <div className="focus-title">{currentTask.name}</div>
                  <div className="focus-subtitle">
                    {currentTask.category} • Scheduled {globalRangeLabel(currentTask.start, currentTask.end)}
                  </div>
                  <div className="focus-progress">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${currentTask.progress}%` }} />
                    </div>
                    <span className="progress-text">{currentTask.progress}% complete</span>
                  </div>
                </>
              ) : (
                <p>No scheduled task for this week.</p>
              )}
              <div className="focus-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => setActiveWeek(((activeWeek - 2 + UNIT_WEEKS) % UNIT_WEEKS) + 1)}
                >
                  ← Previous
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setActiveWeek((activeWeek % UNIT_WEEKS) + 1)}
                >
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
