import React, { useState, useCallback } from 'react';
import { topicsData, topicGroupsData } from '../data/assessments';

const topicById = Object.fromEntries(topicsData.map(t => [t.id, t]));

export default function TopicsBrowser({ onTopicChange }) {
  const [activeTopic, setActiveTopic] = useState('all');
  const [openGroups, setOpenGroups] = useState(['grp-math']);

  const select = useCallback((topicId) => {
    setActiveTopic(topicId);
    if (onTopicChange) onTopicChange(topicId);
  }, [onTopicChange]);

  const toggleGroup = useCallback((groupId) => {
    setOpenGroups(prev => (
      prev.includes(groupId) ? prev.filter(g => g !== groupId) : [...prev, groupId]
    ));
  }, []);

  return (
    <aside className="topic-panel" id="topics" aria-labelledby="topics-title">
      <h2 className="topic-panel-title" id="topics-title">Explore by Topic</h2>
      <p className="topic-panel-hint">Subject domain &rarr; topic</p>

      <ul className="topic-tree">
        <li>
          <button
            type="button"
            className={`topic-node ${activeTopic === 'all' ? 'active' : ''}`}
            aria-current={activeTopic === 'all' ? 'true' : undefined}
            onClick={() => select('all')}
          >
            <span className="topic-node-icon" aria-hidden="true">{topicById.all.icon}</span>
            All Topics
          </button>
        </li>

        {topicGroupsData.map(group => {
          const open = openGroups.includes(group.id);
          const groupActive = activeTopic === group.id;
          return (
            <li key={group.id} className="topic-group">
              <div className="topic-group-row">
                <button
                  type="button"
                  className={`topic-node topic-group-toggle ${groupActive ? 'active' : ''}`}
                  aria-current={groupActive ? 'true' : undefined}
                  onClick={() => select(group.id)}
                >
                  <span className="topic-node-icon" aria-hidden="true">{group.icon}</span>
                  {group.name}
                </button>
                <button
                  type="button"
                  className="topic-caret"
                  aria-expanded={open}
                  aria-label={`${open ? 'Collapse' : 'Expand'} ${group.name}`}
                  onClick={() => toggleGroup(group.id)}
                >
                  {open ? '▾' : '▸'}
                </button>
              </div>

              {open && (
                <ul className="topic-children">
                  {group.topicIds.map(topicId => {
                    const topic = topicById[topicId];
                    if (!topic) return null;
                    const childActive = activeTopic === topicId;
                    return (
                      <li key={topicId}>
                        <button
                          type="button"
                          className={`topic-node topic-child ${childActive ? 'active' : ''}`}
                          aria-current={childActive ? 'true' : undefined}
                          onClick={() => select(topicId)}
                        >
                          <span className="topic-node-icon" aria-hidden="true">{topic.icon}</span>
                          {topic.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
