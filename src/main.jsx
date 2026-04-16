import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log("Main script loaded");
const rootElement = document.getElementById('root');
console.log("Root element found:", rootElement);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
