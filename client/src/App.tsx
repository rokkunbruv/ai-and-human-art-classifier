import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Main from './pages/Main.tsx';
import About from './pages/About.tsx';
import Results from './pages/Results.tsx'; 

import AppContainer from './components/AppContainer.tsx';

function App() {    
  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
