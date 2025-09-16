import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ cartCount, theme, onToggleTheme }) {
  return (
    <header className="fixed top-0 left-0 z-10 w-full p-4 transition-colors duration-200 bg-surface shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-accent rounded" aria-label="Página inicial">
          <span aria-hidden="true">🛍️</span>
          <strong>Shop</strong>
          <span className="text-accent" aria-hidden="true">.</span>
        </NavLink>

        <nav className="flex items-center space-x-4" aria-label="Ações e navegação">
          <div className="flex items-center space-x-4" role="navigation" aria-label="Seções">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-2 px-3 transition-colors duration-200 rounded focus:outline-none focus:ring-2 focus:ring-accent ${
                  isActive ? 'font-semibold text-accent' : 'text-fg hover:text-accent'
                }`
              }
              aria-label="Ir para Catálogo"
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/kanban"
              className={({ isActive }) =>
                `py-2 px-3 transition-colors duration-200 rounded focus:outline-none focus:ring-2 focus:ring-accent ${
                  isActive ? 'font-semibold text-accent' : 'text-fg hover:text-accent'
                }`
              }
              aria-label="Ir para Kanban"
            >
              Kanban
            </NavLink>
          </div>

          <button
            type="button"
            className={`relative w-14 h-8 rounded-full bg-surface-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer ${
              theme === 'dark' ? 'bg-surface-3' : ''
            }`}
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
            aria-pressed={theme === 'dark'}
          >
            <span
              className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-surface transition-transform duration-200 ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`}
              aria-hidden="true"
            />
          </button>

          <div className="flex items-center space-x-2" role="status" aria-live="polite" aria-label="Itens no carrinho">
            <span className="text-xl" aria-hidden="true">🛒</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              {cartCount}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}