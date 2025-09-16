import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Catalog from './pages/Catalog.jsx';
import Kanban from './pages/Kanban.jsx';

import foneImage from './assets/fone.jpg';
import tecladoImage from './assets/teclado.jpg';
import mouseImage from './assets/mouse.jpg';
import monitorImage from './assets/monitor.jpg';
import webcamImage from './assets/webcam.jpg';
import cadeiraImage from './assets/cadeira.jpg';

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
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const productsWithVariant = useMemo(() => {
    return PRODUCTS.map(p => ({ ...p, buttonVariant: buttonVariantFromTag(p.tag) }));
  }, []);

  const handleAdd = () => {
    setCartCount((c) => c + 1);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg">
        <Navbar
          cartCount={cartCount}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main className="pt-24 px-4 md:px-8" tabIndex={-1}>
          <Routes>
            <Route
              path="/"
              element={
                <Catalog
                  products={productsWithVariant}
                  onAdd={handleAdd}
                />
              }
            />
            <Route
              path="/kanban"
              element={<Kanban />}
            />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}