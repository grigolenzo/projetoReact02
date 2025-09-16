import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar.jsx';
import Catalog from './pages/Catalog.jsx';
import Kanban from './pages/Kanban.jsx';

import foneImage from './assets/fone.jpg';
import tecladoImage from './assets/teclado.jpg';
import mouseImage from './assets/mouse.jpg';
import monitorImage from './assets/monitor.jpg';
import webcamImage from './assets/webcam.jpg';
import cadeiraImage from './assets/cadeira.jpg';

const GlobalStyles = createGlobalStyle`
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    background: ${(p) => p.theme.bg};
    color: ${(p) => p.theme.fg};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background 200ms ease, color 200ms ease;
  }
`;

const lightTheme = {
  bg: '#f7f7f8',
  fg: '#111114',
  fgStrong: '#0a0a0d',
  surface: '#ffffff',
  surface2: '#f1f1f3',
  surface3: '#e7e7ea',
  border: '#dcdce1',
  accent: '#5b7cfa',
  focus: '#ff8f1f',
  star: '#e6b800',
  skeleton: '#e9e9ee',
  skeletonHighlight: '#ffffffa6',
  shadows: {
    xs: '0 1px 2px rgba(0,0,0,0.05)',
    sm: '0 2px 6px rgba(0,0,0,0.06)',
    md: '0 8px 24px rgba(0,0,0,0.12)'
  }
};

const darkTheme = {
  bg: '#0e0f12',
  fg: '#e9e9ef',
  fgStrong: '#ffffff',
  surface: '#15161a',
  surface2: '#1b1c22',
  surface3: '#22242b',
  border: '#2a2c34',
  accent: '#7aa2ff',
  focus: '#ffd166',
  star: '#ffd166',
  skeleton: '#1c1d24',
  skeletonHighlight: '#2a2c34',
  shadows: {
    xs: '0 1px 2px rgba(0,0,0,0.4)',
    sm: '0 2px 6px rgba(0,0,0,0.5)',
    md: '0 8px 24px rgba(0,0,0,0.6)'
  }
};

const PRODUCTS = [
  { id: 1, title: 'Fone Bluetooth Pro Max com Cancelamento de Ruído', price: 499.9, rating: 4.6, tag: 'Novo', image: foneImage },
  { id: 2, title: 'Teclado Mecânico RGB Hot-Swap ABNT2', price: 329.0, rating: 4.8, tag: 'Promo', image: tecladoImage },
  { id: 3, title: 'Mouse Gamer 26k DPI com Sensor Óptico', price: 259.9, rating: 4.5, tag: 'Novo', image: mouseImage },
  { id: 4, title: 'Monitor 27" 144Hz IPS QHD', price: 1899.0, rating: 4.7, tag: 'Promo', image: monitorImage },
  { id: 5, title: 'Webcam 1080p com Microfone e Tampa de Privacidade', price: 189.0, rating: 4.3, tag: 'Novo', image: webcamImage },
  { id: 6, title: 'Cadeira Ergonômica com Apoio Lombar', price: 1299.0, rating: 4.4, tag: 'Promo', image: cadeiraImage }
];

const buttonVariantFromTag = (tag) => {
  if (tag === 'Promo') return 'solid';
  if (tag === 'Novo') return 'outline';
  return 'ghost';
};

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const initial = saved === 'dark' ? 'dark' : 'light';
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  const productsWithVariant = useMemo(() => PRODUCTS.map(p => ({ ...p, buttonVariant: buttonVariantFromTag(p.tag) })), []);

  const handleAdd = () => setCartCount(c => c + 1);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <div style={{ minHeight: '100vh' }}>
          <Navbar cartCount={cartCount} theme={theme} onToggleTheme={toggleTheme} />
          <main style={{ paddingTop: '6rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
            <Routes>
              <Route path="/" element={<Catalog products={productsWithVariant} onAdd={handleAdd} />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
