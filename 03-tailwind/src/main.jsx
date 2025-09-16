// Importa React e ReactDOM para renderizar a aplicação
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// Importa o arquivo CSS do Tailwind
import './index.css';

// Cria a raiz React com o elemento encontrado
const root = createRoot(document.getElementById('root'));

// Renderiza o componente App dentro de StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);