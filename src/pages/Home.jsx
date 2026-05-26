import React, { useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../sections/HeroSection';
import StatsSection from '../sections/StatsSection';
import TopicsBrowser from '../sections/TopicsBrowser';
import AssessmentGrid from '../sections/AssessmentGrid';
import FeaturesSection from '../sections/FeaturesSection';
import SiteFooter from '../sections/SiteFooter';

export default function Home() {
  const [activeTopic, setActiveTopic] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleTopicChange = useCallback((topicId) => {
    setActiveTopic(topicId);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  return (
    <div>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <TopicsBrowser onTopicChange={handleTopicChange} />

      <div className="container">
        <div className="assessments-header">
          <h2>Available Assessments</h2>
          <div className="filter-tabs" role="tablist" aria-label="Level filters">
            <button
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              data-filter="all"
              role="tab"
              aria-selected={activeFilter === 'all'}
              onClick={() => handleFilterChange('all')}
            >All</button>
            <button
              className={`filter-tab ${activeFilter === 'myp4' ? 'active' : ''}`}
              data-filter="myp4"
              role="tab"
              aria-selected={activeFilter === 'myp4'}
              onClick={() => handleFilterChange('myp4')}
            >MYP4</button>
            <button
              className={`filter-tab ${activeFilter === 'myp5' ? 'active' : ''}`}
              data-filter="myp5"
              role="tab"
              aria-selected={activeFilter === 'myp5'}
              onClick={() => handleFilterChange('myp5')}
            >MYP5</button>
            <button
              className={`filter-tab ${activeFilter === 'dp' ? 'active' : ''}`}
              data-filter="dp"
              role="tab"
              aria-selected={activeFilter === 'dp'}
              onClick={() => handleFilterChange('dp')}
            >DP</button>
          </div>
        </div>
      </div>

      <AssessmentGrid activeTopic={activeTopic} activeFilter={activeFilter} />
      <FeaturesSection />
      <SiteFooter />
    </div>
  );
}
