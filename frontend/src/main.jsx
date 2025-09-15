// Ponto de entrada principal da aplicação Poetry Creator
// Main entry point of Poetry Creator application

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Log de inicialização - Initialization log
console.log('🎭 POETRY CREATOR - FRONTEND INICIANDO...');
console.log('⚡ React Version:', React.version);
console.log('🌍 Environment:', import.meta.env.MODE);
console.log('🔗 API URL:', import.meta.env.VITE_API_BASE_URL);

// Encontrar elemento root - Find root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ Elemento root não encontrado!');
  throw new Error('Root element not found');
}

// Criar root do React 18 - Create React 18 root
const root = ReactDOM.createRoot(rootElement);

// Renderizar aplicação - Render application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log de sucesso - Success log
console.log('✅ Poetry Creator Frontend iniciado com sucesso!');

// Service Worker para PWA (opcional) - Service Worker for PWA (optional)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('✅ SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('❌ SW registration failed: ', registrationError);
      });
  });
}
