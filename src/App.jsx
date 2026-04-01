import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Workflows from './pages/Workflows';
import Solutions from './pages/Solutions';
import LearningModules from './pages/LearningModules';
import AISearch from './pages/AISearch';
import Experts from './pages/Experts';
import Handoffs from './pages/Handoffs';
import Insights from './pages/Insights';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Dashboard Routes with Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/learning" element={<LearningModules />} />
          <Route path="/ai-search" element={<AISearch />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/handoffs" element={<Handoffs />} />
          <Route path="/insights" element={<Insights />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
