import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { assessmentsData } from '../data/assessments';
import SiteFooter from '../sections/SiteFooter';

const subjects = [
  { id: 'all', label: 'All Subjects' },
  { id: 'math', label: 'Mathematics' },
  { id: 'ins', label: 'I & S' },
];

const sortOptions = [
  { id: 'name', label: 'Name' },
  { id: 'difficulty', label: 'Difficulty' },
  { id: 'questions', label: 'Question Count' },
  { id: 'marks', label: 'Total Marks' },
];

function AssessmentCard({ assessment }) {
  const difficultyDots = [];
  for (let i = 0; i < 5; i++) {
    difficultyDots.push(<span key={i} className={i < assessment.difficulty ? 'active' : ''}></span>);
  }

  return (
    <a href={assessment.href} className="assessment-card" aria-label={`Start ${assessment.title} assessment`}>
      <div className="card-header">
        <div className={`card-icon ${assessment.iconBg}`}>{assessment.icon}</div>
        <span className={`card-badge badge-${assessment.category}`}>{assessment.badge}</span>
      </div>
      <h3 className="card-title">{assessment.title}</h3>
      <p className="card-desc">{assessment.description}</p>
      <div className="card-topics">
        {assessment.topics.map((t, i) => <span key={i} className="topic-tag">{t}</span>)}
      </div>
      <div className="card-meta">
        <div className="meta-item"><span className="icon">📝</span>{assessment.questionCount} Questions</div>
        <div className="meta-item"><span className="icon">⏱</span>{assessment.time} mins</div>
        <div className="meta-item"><span className="icon">🏆</span>{assessment.marks} marks</div>
      </div>
      <div className="card-footer">
        <div className="difficulty">
          <span className="difficulty-label">Difficulty</span>
          {difficultyDots}
        </div>
        <span className="start-btn">Start Exam →</span>
      </div>
    </a>
  );
}

export default function Assessments() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const filtered = useMemo(() => {
    let list = [...assessmentsData];

    if (subjectFilter !== 'all') {
      list = list.filter(a => a.subject === subjectFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.topics.some(t => t.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      switch (sortBy) {
        case 'difficulty': return b.difficulty - a.difficulty;
        case 'questions': return b.questionCount - a.questionCount;
        case 'marks': return b.marks - a.marks;
        case 'name':
        default: return a.title.localeCompare(b.title);
      }
    });

    return list;
  }, [search, sortBy, subjectFilter]);

  return (
    <div>
      <Navbar />
      <main className="container" style={{ paddingTop: '32px' }}>
        <div className="assessments-toolbar">
          <h2>All Assessments</h2>
          <div className="assessments-controls">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="search"
                className="search-input"
                placeholder="Search by title, topic, keyword..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search assessments"
              />
            </div>
            <select
              className="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              aria-label="Sort by"
            >
              {sortOptions.map(o => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-tabs" role="tablist" aria-label="Subject filters" style={{ marginBottom: '24px' }}>
          {subjects.map(s => (
            <button
              key={s.id}
              className={`filter-tab ${subjectFilter === s.id ? 'active' : ''}`}
              role="tab"
              aria-selected={subjectFilter === s.id}
              onClick={() => setSubjectFilter(s.id)}
            >{s.label}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="history-empty">
            <div className="history-empty-icon">📭</div>
            <p>No assessments match your search.</p>
            <button className="btn btn-secondary" style={{ marginTop: '16px' }} onClick={() => { setSearch(''); setSubjectFilter('all'); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="assessments-grid">
            {filtered.map(a => <AssessmentCard key={a.id} assessment={a} />)}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
