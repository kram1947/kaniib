import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { topicsData, assessmentsData } from '../data/assessments';
import SiteFooter from '../sections/SiteFooter';

function TopicSection({ topic }) {
  const related = useMemo(() => {
    if (topic.id === 'all') return assessmentsData;
    return assessmentsData.filter(a => a.topicIds?.includes(topic.id));
  }, [topic]);

  const totalQuestions = related.reduce((sum, a) => sum + a.questionCount, 0);
  const avgDifficulty = related.length
    ? (related.reduce((sum, a) => sum + a.difficulty, 0) / related.length).toFixed(1)
    : 0;

  return (
    <section className="topic-detail-section">
      <div className="topic-detail-header">
        <div className="topic-detail-icon" style={{ background: topic.color }}>{topic.icon}</div>
        <div className="topic-detail-info">
          <h3>{topic.name}</h3>
          <div className="topic-detail-stats">
            <span>{related.length} assessments</span>
            <span className="stat-sep">•</span>
            <span>{totalQuestions} questions</span>
            {avgDifficulty > 0 && (
              <>
                <span className="stat-sep">•</span>
                <span>Avg difficulty: {avgDifficulty}/5</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="topic-detail-assessments">
        {related.map(a => (
          <Link key={a.id} to={a.href} className="topic-assessment-link">
            <span className="topic-assessment-icon">{a.icon}</span>
            <div className="topic-assessment-body">
              <strong>{a.title}</strong>
              <span className="topic-assessment-meta">
                {a.questionCount} questions • {a.time} mins • {a.marks} marks
              </span>
            </div>
            <span className="start-btn-small">Start →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Topics() {
  const activeTopics = topicsData.filter(t => t.id !== 'all');

  return (
    <div>
      <Navbar />
      <main className="container topics-page" style={{ paddingTop: '32px' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <h2>Browse by Topic</h2>
          <p>Explore assessments organized by subject domain</p>
        </div>

        <div className="topics-list">
          {activeTopics.map(topic => (
            <TopicSection key={topic.id} topic={topic} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
