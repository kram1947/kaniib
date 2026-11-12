import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Assessments from './pages/Assessments';
import Topics from './pages/Topics';
import StudyTimeline from './pages/StudyTimeline';
import StudyTimelineChemistry from './pages/StudyTimelineChemistry';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/study-timeline" element={<StudyTimeline />} />
          <Route path="/study-timeline/chemistry" element={<StudyTimelineChemistry />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
