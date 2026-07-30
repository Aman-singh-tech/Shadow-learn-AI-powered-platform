import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './layouts/DashboardLayout';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

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
import Auth from './pages/Auth';
import ResetPassword from './pages/ResetPassword';

function App() {
  React.useEffect(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 200,
        once: true,
        easing: 'ease-in-out',
      });
    }
  }, []);

  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#111827',
              color: '#fff',
              border: '1px solid #374151',
            },
          }} 
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
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
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
