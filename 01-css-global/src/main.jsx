// Importa React e ReactDOM para renderizar a aplicação
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// Importa o arquivo global.css que conterá todos os estilos
import './styles/global.css';

// Localiza o elemento com id 'root' para montar a aplicação
const rootElement = document.getElementById('root');

// Cria a raiz React com o elemento encontrado
const root = createRoot(rootElement);

// Renderiza o componente App dentro de StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);