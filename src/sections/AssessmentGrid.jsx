import React from 'react';
import { assessmentsData, comingSoonData, topicGroupsData } from '../data/assessments';

const groupById = Object.fromEntries(topicGroupsData.map(g => [g.id, g]));

// A group selection matches any of its topics; a leaf selection matches itself.
function resolveTopicFilter(activeTopic) {
  if (!activeTopic || activeTopic === 'all') return null;
  const group = groupById[activeTopic];
  return new Set(group ? group.topicIds : [activeTopic]);
}

function AssessmentCard({ assessment }) {
  const difficultyDots = [];
  for (let i = 0; i < 5; i++) {
    difficultyDots.push(<span key={i} className={i < assessment.difficulty ? 'active' : ''}></span>);
  }

  return (
    <a
      href={assessment.href}
      className="assessment-card"
      data-category={assessment.category}
      data-topics={assessment.topicIds?.join(',') || ''}
      aria-label={`Start ${assessment.title} assessment`}
    >
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
        <div className="difficulty"><span className="difficulty-label">Difficulty</span>{difficultyDots}</div>
        <span className="start-btn">Start Exam →</span>
      </div>
    </a>
  );
}

function ComingSoonCard({ item }) {
  return (
    <div className="assessment-card coming-soon" data-category={item.category}>
      <div className="coming-soon-icon">{item.icon}</div>
      <div className="coming-soon-title">{item.title}</div>
      <div className="coming-soon-topics">{item.topics}</div>
    </div>
  );
}

export default function AssessmentGrid({ activeTopic, activeFilter }) {
  const topicFilter = resolveTopicFilter(activeTopic);

  const filtered = assessmentsData.filter(a => {
    if (topicFilter && !a.topicIds?.some(t => topicFilter.has(t))) return false;
    if (activeFilter && activeFilter !== 'all' && a.category !== activeFilter) return false;
    return true;
  });

  return (
    <div id="assessments" className="assessments-grid">
      {filtered.map(assessment => (
        <AssessmentCard key={assessment.id} assessment={assessment} />
      ))}
      {comingSoonData.map((item, i) => (
        <ComingSoonCard key={i} item={item} />
      ))}
      {filtered.length === 0 && (
        <p className="assessments-empty">No assessments match this topic yet.</p>
      )}
    </div>
  );
}
