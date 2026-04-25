import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components (we'll create these later)
import Home from './pages/Home';
import Assessments from './pages/Assessments';
import Topics from './pages/Topics';
import Features from './pages/Features';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/features" element={<Features />} />
          {/* Redirect root to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
