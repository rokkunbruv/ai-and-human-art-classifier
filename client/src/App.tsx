import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './pages/Main.tsx';
import About from './pages/About.tsx';
import Results from './pages/Results.tsx';

function App() {    
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/results" element={<Results />} />
      </Routes>
  </Router>
  );
}

export default App;
