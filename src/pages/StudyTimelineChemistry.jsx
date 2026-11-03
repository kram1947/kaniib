import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../sections/SiteFooter';

const timelineMeta = {
  unit: '26/27 Unit - CHEMISTRY A: Matter',
  subject: 'Sciences',
  grade: 'Grade 10',
  template: 'Standard',
  duration: '20 Weeks',
  hours: '19 Hours',
  startDate: 'Week 3, August',
  lastUpdated: 'Aug 11, 2026',
  updatedBy: 'Justin Rasmussen',
};

const TOTAL_WEEKS = 20;

const categories = [
  {
    name: 'Concept Development',
    color: '#6366f1',
    tasks: [
      { id: 'c1', name: 'Nature of Matter & States of Matter', start: 1, end: 3, progress: 100 },
      { id: 'c2', name: 'Atomic Structure & Isotopes', start: 4, end: 7, progress: 100 },
      { id: 'c3', name: 'Electron Configuration & Orbitals', start: 8, end: 10, progress: 60 },
    ],
  },
  {
    name: 'System Design',
    color: '#10b981',
    tasks: [
      { id: 's1', name: 'Periodic Table & Periodic Trends', start: 11, end: 13, progress: 30 },
      { id: 's2', name: 'Chemical Bonding — Ionic & Covalent', start: 14, end: 16, progress: 0 },
      { id: 's3', name: 'Intermolecular Forces & Properties', start: 17, end: 18, progress: 0 },
    ],
  },
  {
    name: 'Detail Design',
    color: '#f59e0b',
    tasks: [
      { id: 'd1', name: 'Chemical Reactions & Equations', start: 15, end: 17, progress: 0 },
      { id: 'd2', name: 'Stoichiometry & Mole Concept', start: 18, end: 20, progress: 0 },
    ],
  },
  {
    name: 'Test & Refine',
    color: '#ef4444',
    tasks: [
      { id: 't1', name: 'Acids, Bases & pH Calculations', start: 16, end: 18, progress: 0 },
      { id: 't2', name: 'Redox & Electrochemistry Basics', start: 19, end: 20, progress: 0 },
    ],
  },
  {
    name: 'Produce',
    color: '#8b5cf6',
    tasks: [
      { id: 'p1', name: 'Internal Assessment — Chemistry', start: 14, end: 20, progress: 0 },
      { id: 'p2', name: 'Unit Review & Practice Papers', start: 19, end: 20, progress: 0 },
    ],
  },
  {
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

function WeekLabel({ week }) {
  return (
    <div className="gantt-week">
      <div className="gantt-week-num">W{week}</div>
    </div>
  );
}

function GanttRow({ task, categoryColor }) {
  const startLeft = ((task.start - 1) / TOTAL_WEEKS) * 100;
  const width = ((task.end - task.start + 1) / TOTAL_WEEKS) * 100;
  const progressWidth = (task.progress / 100) * width;

  return (
    <div className="gantt-row">
      <div className="gantt-label">{task.name}</div>
      <div className="gantt-bar-track">
        <div
          className="gantt-bar"
          style={{
            left: `${startLeft}%`,
            width: `${width}%`,
            background: categoryColor,
          }}
        >
          <div
            className="gantt-progress"
            style={{ width: `${progressWidth}%`, background: 'rgba(255,255,255,0.35)' }}
          />
        </div>
        {task.progress > 0 && (
          <div className="gantt-progress-label">{task.progress}%</div>
        )}
      </div>
      <div className="gantt-meta">
        <span className="gantt-range">W{task.start}–W{task.end}</span>
      </div>
    </div>
  );
}

function MilestoneMarker({ milestone, index }) {
  const left = ((milestone.week - 1) / TOTAL_WEEKS) * 100;
  return (
    <div
      className="gantt-milestone"
      style={{ left: `${left}%` }}
      title={`${milestone.label}: ${milestone.title} (${milestone.date})`}
    >
      <div className="gantt-milestone-diamond" />
      <div className="gantt-milestone-label">{milestone.label}</div>
    </div>
  );
}

export default function StudyTimelineChemistry() {
  const [activeWeek, setActiveWeek] = useState(1);

  const allTasks = categories.flatMap((c) =>
    c.tasks.map((t) => ({ ...t, category: c.name, color: c.color }))
  );

  const currentTask = allTasks.find(
    (t) => activeWeek >= t.start && activeWeek <= t.end
  );

  return (
    <div>
      <Navbar />
      <main className="container" style={{ paddingTop: '24px', paddingBottom: '80px' }}>
        <section className="chem-timeline-page">
          <div className="chem-timeline-header">
            <div className="chem-timeline-badge">
              <span className="badge-dot"></span>
              <span>Study Timeline — Science</span>
            </div>
            <h1>{timelineMeta.unit}</h1>
            <p className="chem-timeline-desc">
              A {timelineMeta.duration} study plan for {timelineMeta.subject}, {timelineMeta.grade}.
              Track milestones week by week through the Chemistry A: Matter unit.
            </p>
          </div>

          <div className="chem-meta-grid">
            <div className="chem-meta-card">
              <div className="chem-meta-label">Unit Template</div>
              <div className="chem-meta-value">{timelineMeta.template}</div>
            </div>
            <div className="chem-meta-card">
              <div className="chem-meta-label">Subjects</div>
              <div className="chem-meta-value">{timelineMeta.subject}</div>
            </div>
            <div className="chem-meta-card">
              <div className="chem-meta-label">Grade</div>
              <div className="chem-meta-value">{timelineMeta.grade}</div>
            </div>
            <div className="chem-meta-card">
              <div className="chem-meta-label">Start date</div>
              <div className="chem-meta-value">{timelineMeta.startDate}</div>
            </div>
            <div className="chem-meta-card">
              <div className="chem-meta-label">Duration</div>
              <div className="chem-meta-value">{timelineMeta.duration}</div>
            </div>
            <div className="chem-meta-card">
              <div className="chem-meta-label">Hours</div>
              <div className="chem-meta-value">{timelineMeta.hours}</div>
            </div>
            <div className="chem-meta-card chem-meta-card-wide">
              <div className="chem-meta-label">Last updated</div>
              <div className="chem-meta-value">
                {timelineMeta.lastUpdated} by {timelineMeta.updatedBy}
              </div>
            </div>
          </div>

          <div className="chem-gantt">
            <div className="gantt-header">
              <div className="gantt-label-col">Category / Task</div>
              <div className="gantt-time-scale">
                {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((w) => (
                  <WeekLabel key={w} week={w} />
                ))}
              </div>
            </div>

            <div className="gantt-body">
              <div className="gantt-labels">
                {categories.map((cat) => (
                  <div key={cat.name} className="gantt-category">
                    {cat.name}
                  </div>
                ))}
                {categories.flatMap((cat) =>
                  cat.tasks.map((t) => (
                    <GanttRow key={t.id} task={t} categoryColor={cat.color} />
                  ))
                )}
              </div>

              <div className="gantt-chart">
                <div className="gantt-grid">
                  {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((w) => (
                    <div key={w} className="gantt-week-col" />
                  ))}
                </div>

                <div className="gantt-milestones-layer">
                  {milestones.map((m) => (
                    <MilestoneMarker key={m.id} milestone={m} />
                  ))}
                </div>

                {categories.flatMap((cat) =>
                  cat.tasks.map((t) => (
                    <GanttRow key={t.id} task={t} categoryColor={cat.color} />
                  ))
                )}
              </div>
            </div>

            <div className="gantt-legend">
              {categories.map((cat) => (
                <span
                  key={cat.name}
                  className="gantt-legend-item"
                  style={{ borderLeftColor: cat.color }}
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>

          <div className="chem-weekly-focus">
            <h2>Week {activeWeek} Focus</h2>
            <div className="weekly-focus-card">
              {currentTask ? (
                <>
                  <div className="focus-title">{currentTask.name}</div>
                  <div className="focus-subtitle">
                    {currentTask.category} • Scheduled W{currentTask.start}–W{currentTask.end}
                  </div>
                  <div className="focus-progress">
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${currentTask.progress}%` }}
                      />
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
                  onClick={() => setActiveWeek(((activeWeek - 2 + TOTAL_WEEKS) % TOTAL_WEEKS) + 1)}
                >
                  ← Previous
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setActiveWeek((activeWeek % TOTAL_WEEKS) + 1)}
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
