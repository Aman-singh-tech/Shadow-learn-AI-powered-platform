import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google';

console.log("Main script loaded");
const rootElement = document.getElementById('root');
console.log("Root element found:", rootElement);

const GOOGLE_CLIENT_ID = "715090563506-2c7sl3uhrpo60692v3p1v8rr0mr0nspv.apps.googleusercontent.com";

createRoot(rootElement).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
