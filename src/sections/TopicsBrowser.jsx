import React, { useState } from 'react';
import { topicsData } from '../data/assessments';

export default function TopicsBrowser({ onTopicChange }) {
  const [activeTopic, setActiveTopic] = useState('all');

  const handleClick = (e, topicId) => {
    e.preventDefault();
    setActiveTopic(topicId);
    if (onTopicChange) onTopicChange(topicId);
  };

  return (
    <section className="topics-section" id="topics" aria-labelledby="topics-title">
      <div className="section-header">
        <h2 id="topics-title">Explore by Topic</h2>
        <p>Filter assessments by mathematical domain</p>
      </div>
      <div className="topics-grid" role="tablist" aria-label="Topic filters">
        {topicsData.map(topic => (
          <a
            key={topic.id}
            href="#"
            className={`topic-chip ${activeTopic === topic.id ? 'active' : ''}`}
            data-topic={topic.id}
            role="tab"
            aria-selected={activeTopic === topic.id}
            onClick={(e) => handleClick(e, topic.id)}
          >
            <div className="topic-icon" style={{ background: topic.color }}>{topic.icon}</div>
            <span>{topic.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
