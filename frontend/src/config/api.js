/**
 * ShadowLearn API Configuration
 * Centralizes the base URL for the backend API.
 * Uses environment variables if available, otherwise defaults to localhost.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  WORKFLOWS: `${API_BASE_URL}/api/workflows`,
  SOLUTIONS: `${API_BASE_URL}/api/solutions`,
  MODULES: `${API_BASE_URL}/api/modules`,
  HANDOFFS: `${API_BASE_URL}/api/handoffs`,
  DASHBOARD: `${API_BASE_URL}/api/dashboard`,
  USERS: `${API_BASE_URL}/api/users`,
  AI: `${API_BASE_URL}/api/ai`,
  INSIGHTS: `${API_BASE_URL}/api/insights`
};

export default API_BASE_URL;
