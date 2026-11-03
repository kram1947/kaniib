import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Assessments from './pages/Assessments';
import Topics from './pages/Topics';
import Features from './pages/Features';
import StudyTimeline from './pages/StudyTimeline';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/features" element={<Features />} />
          <Route path="/study-timeline" element={<StudyTimeline />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
