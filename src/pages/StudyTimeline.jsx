import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SiteFooter from '../sections/SiteFooter';

const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const MONTH_COUNT = MONTHS.length;

const timelineMeta = {
  unit: '26/27 Unit 2: Quadratic models',
  subject: 'Standard Mathematics',
  grade: 'Grade 10',
  template: 'Standard',
  duration: '6 Weeks',
  startDate: 'Week 3, October',
  lastUpdated: 'Sep 22, 2026',
  updatedBy: 'Wilhelm Tunemyr',
};

const groups = [
  {
    id: 'math',
    name: 'Core Subject: Mathematics — Unit 2: Quadratic Models',
    color: '#ec4899',
    rows: [
      { name: 'Algebra & Linear Functions', start: 1, span: 3, note: 'Aug – Oct 2026: Linear Equations, Graphs & Inequalities' },
      { name: 'Algebraic Expressions & Expansion', start: 3, span: 1, note: 'Oct 2026: Expansion, Simplification & Factoring' },
      { name: 'Special Products: DOTS & Binomial Squares', start: 3, span: 2, note: 'Oct – Nov 2026: Difference of Two Squares & Binomial Squares' },
      { name: 'Algebraic Fractions & Binomials', start: 3, span: 2, note: 'Oct – Nov 2026: Simplifying Algebraic Fractions & Binomials' },
      { name: 'Solving: Factorisation & Completing the Square', start: 4, span: 1, note: 'Nov 2026: Solving by Factorisation & Completing the Square' },
      { name: 'Quadratic Formula & Solving with GDC', start: 4, span: 1, note: 'Nov 2026: Quadratic Formula & GDC Methods' },
      { name: 'Parabolas: Intercepts, Symmetry & Vertex', start: 3, span: 2, note: 'Oct – Nov 2026: Axes Intercepts, Axis of Symmetry & Vertex' },
      { name: 'Forms of a Quadratic & Determining Equations', start: 4, span: 1, note: 'Nov 2026: Equivalent Forms & Determining Quadratics' },
      { name: 'Quadratic Models & Problem Solving', start: 4, span: 1, note: 'Nov 2026: Projectile & Revenue Models, Problem Solving' },
      { name: 'Imaginary & Complex Numbers (Extended)', start: 4, span: 1, note: 'Nov 2026: Imaginary & Complex Roots (Extended Only)' },
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
      { name: 'School Assessment — Math Unit 2 (20 Nov)', start: 4, span: 1, note: 'Fri 20 Nov 2026: School assessment for 26/27 Unit 2: Quadratic models' },
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

const UNIT_START_DATE = new Date(2026, 9, 19);
const UNIT_WEEKS = 6;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const unitWeeks = [
  {
    week: 1,
    title: 'Quadratic Foundations',
    dates: 'Oct 19 – 25',
    topics: ['Algebraic expressions: expansion & simplification', 'Factoring review', 'Parabolas: introduction'],
  },
  {
    week: 2,
    title: 'Special Products & Fractions',
    dates: 'Oct 26 – Nov 1',
    topics: ['Difference of two squares', 'Binomial squares', 'Simplifying algebraic fractions & binomials'],
  },
  {
    week: 3,
    title: 'Solving Quadratics I',
    dates: 'Nov 2 – 8',
    topics: ['Solving by factorisation', 'Completing the square'],
  },
  {
    week: 4,
    title: 'Solving Quadratics II',
    dates: 'Nov 9 – 15',
    topics: ['Quadratic formula', 'Solving with GDC', 'Imaginary & complex numbers (extended)'],
  },
  {
    week: 5,
    title: 'Parabolas & Assessment',
    dates: 'Nov 16 – 22',
    topics: ['Axes intercepts, symmetry & vertex', 'Forms & determining quadratics', 'Problem solving'],
    assessment: 'School Assessment — Fri 20 Nov 2026',
  },
  {
    week: 6,
    title: 'Models & Review',
    dates: 'Nov 23 – 29',
    topics: ['Quadratic models & problem solving', 'Review & reflection'],
  },
];

function getUnitWeekInfo() {
  const now = new Date();
  const raw = Math.floor((now.getTime() - UNIT_START_DATE.getTime()) / WEEK_MS) + 1;
  const week = Math.min(UNIT_WEEKS, Math.max(1, raw));
  const state = raw < 1 ? 'upcoming' : raw > UNIT_WEEKS ? 'completed' : 'current';
  return { week, state };
}

const unitPlanner = {
  keyConcept: 'Form — the shape and underlying structure of an entity or piece of work, including its organization, essential nature and external appearance.',
  relatedConcepts: ['Equivalence', 'Patterns', 'Change'],
  globalContext: 'Scientific and technical innovation',
  learnerProfile: 'Communicators',
  atlSkills: 'Communication',
  criteria: [
    { id: 'A', name: 'Knowing and understanding' },
    { id: 'B', name: 'Investigating patterns' },
    { id: 'C', name: 'Communicating' },
  ],
  conceptualUnderstanding:
    "In this unit we are exploring how principles and discoveries help shape models through adaptation to the context. We see how the form of a quadratic equation influences what patterns we see and how, while there is equivalence between different forms of equations, they are differently suitable to different questions. The shape of the parabola invites students to ask questions about change, contrasting the changing gradient of a parabola with the constant gradient of a linear function. The parabola represents an idealized model of movement through the air, which is in contrast both to Aristotle's views from Ancient times, but also to the observations made when air resistance is non-negligible. This formed part of the discovery of modern mechanics and will prompt reflection on what makes a good model, in different contexts.",
  statementOfInquiry:
    'Quadratic equations are important models in many situations, and can be written in different forms. These forms, while equivalent, show different patterns and describe the change in variables in different ways. Adaptation of a model to suit a particular problem enables discoveries such as the principles of motion. It was also historically a driving force behind the need to rigorously understand how infinitesimal changes can be described mathematically.',
  inquiryQuestions: [
    {
      type: 'Factual',
      items: [
        'What is the connection between different forms of quadratic equations?',
        'How much information do I need to fully describe different kinds of polynomials?',
        'How can we interpret the parameters in different forms of quadratic equations?',
      ],
    },
    {
      type: 'Conceptual',
      items: [
        'How do we interpret the negative solution in cases of physical models?',
        'What do we mean by a function?',
      ],
    },
    {
      type: 'Debatable',
      items: [
        'Are imaginary numbers more made up than, for instance, negative integers?',
        'Are some ways of solving a quadratic equation better than others?',
      ],
    },
  ],
  content: [
    'Algebraic expressions — expansion, simplification & factoring',
    'Difference of two squares',
    'Binomial squares',
    'Simplifying algebraic fractions and binomials',
    'Solving quadratic equations: factorisation, completing the square, quadratic formula & solving with GDC',
    'Parabolas — axes intercepts, axis of symmetry, vertex, forms, determining quadratics & problem solving',
    'Imaginary and complex numbers (extended only)',
  ],
};

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

function PlannerCard({ title, wide, children }) {
  return (
    <div className={`m10-planner-card${wide ? ' wide' : ''}`}>
      <div className="m10-planner-card-title">{title}</div>
      {children}
    </div>
  );
}

export default function StudyTimeline() {
  const [filter, setFilter] = useState('all');
  const visibleGroups = filter === 'all' ? groups : groups.filter((g) => g.id === filter);
  const { week: currentWeek, state: unitState } = getUnitWeekInfo();
  const focusWeek = unitWeeks[currentWeek - 1];

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

          <div className="timeline-weekly-focus">
            <h2>
              Unit 2 · Week {currentWeek} Focus
              <span className="m10-auto-chip">
                {unitState === 'current' ? 'Auto-updated — current week' : unitState === 'upcoming' ? 'Auto — unit upcoming' : 'Auto — unit completed'}
              </span>
            </h2>
            <div className="weekly-focus-card">
              <div className="focus-title">{focusWeek.title}</div>
              <div className="focus-subtitle">
                <ul className="m10-focus-topics">
                  {focusWeek.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="focus-schedule">
                <span className="focus-label">Scheduled</span>
                <span className="focus-date">{focusWeek.dates}, 2026</span>
              </div>
              {focusWeek.assessment && (
                <div className="m10-assessment-callout">{focusWeek.assessment}</div>
              )}
            </div>
          </div>

          <div className="m10-planner">
            <h2>Unit 2 Planner — Quadratic Models</h2>
            <div className="m10-planner-grid">
              <PlannerCard title="Key Concept">
                <p className="m10-planner-text">{unitPlanner.keyConcept}</p>
              </PlannerCard>
              <PlannerCard title="Related Concepts">
                <div className="m10-chip-row">
                  {unitPlanner.relatedConcepts.map((c) => (
                    <span key={c} className="m10-chip">{c}</span>
                  ))}
                </div>
              </PlannerCard>
              <PlannerCard title="Global Context">
                <p className="m10-planner-text">{unitPlanner.globalContext}</p>
              </PlannerCard>
              <PlannerCard title="IB Learner Profile">
                <p className="m10-planner-text">{unitPlanner.learnerProfile}</p>
              </PlannerCard>
              <PlannerCard title="ATL Skills">
                <p className="m10-planner-text">{unitPlanner.atlSkills}</p>
              </PlannerCard>
              <PlannerCard title="MYP Assessment Criteria">
                <ul className="m10-planner-list">
                  {unitPlanner.criteria.map((c) => (
                    <li key={c.id}>
                      <strong>Criterion {c.id}:</strong> {c.name}
                    </li>
                  ))}
                </ul>
              </PlannerCard>
              <PlannerCard title="Statement of Inquiry" wide>
                <p className="m10-planner-text">{unitPlanner.statementOfInquiry}</p>
              </PlannerCard>
              <PlannerCard title="Conceptual Understanding" wide>
                <p className="m10-planner-text">{unitPlanner.conceptualUnderstanding}</p>
              </PlannerCard>
              <PlannerCard title="Inquiry Questions" wide>
                {unitPlanner.inquiryQuestions.map((q) => (
                  <div key={q.type} className="m10-inq-group">
                    <span className={`m10-inq-tag ${q.type.toLowerCase()}`}>{q.type}</span>
                    <ul className="m10-planner-list">
                      {q.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </PlannerCard>
              <PlannerCard title="Content — Topics, Knowledge & Skills" wide>
                <ul className="m10-planner-list">
                  {unitPlanner.content.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </PlannerCard>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
