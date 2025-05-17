import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LanguageDesigner from './pages/LanguageDesigner';
import CodeEditor from './pages/CodeEditor';
import ProjectGenerator from './pages/ProjectGenerator';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/designer" element={<LanguageDesigner />} />
          <Route path="/editor" element={<CodeEditor />} />
          <Route path="/projects" element={<ProjectGenerator />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;