// Barra de navegação fixa com navegação entre Catálogo e Kanban
import React from 'react'; // Importa React
import { NavLink } from 'react-router-dom'; // Importa NavLink para rotas ativas
// Remove o import do CSS Module
// import styles from './Navbar.module.css';

// Componente Navbar com props
export default function Navbar({ cartCount = 0, theme = 'light', onToggleTheme }) { // Declara componente
  return ( // Retorna JSX
    <header className="fixed top-0 inset-x-0 h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm z-50 transition-colors duration-200">
      <div className="max-w-7xl h-full mx-auto px-4 flex items-center justify-between">
        <NavLink to="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100" aria-label="Página inicial">
          <span aria-hidden="true">🛍️</span>
          <strong>Shop</strong>
          <span className="text-blue-500 dark:text-blue-400" aria-hidden="true">.</span>
        </NavLink>

        <nav className="inline-flex items-center gap-4" aria-label="Ações">
          <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-full border border-gray-200 dark:border-gray-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1 rounded-full
                ${isActive ? 'bg-blue-500 text-white font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`
              }
              aria-label="Ir para Catálogo"
            >
              Catálogo
            </NavLink>

            <NavLink
              to="/kanban"
              className={({ isActive }) =>
                `px-3 py-1 rounded-full
                ${isActive ? 'bg-blue-500 text-white font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`
              }
              aria-label="Ir para Kanban"
            >
              Kanban
            </NavLink>
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="relative w-14 h-8 bg-gray-200 dark:bg-gray-600 rounded-full border border-gray-300 dark:border-gray-500 p-0 focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
          >
            <span className={`absolute top-1 left-1 w-6 h-6 bg-white dark:bg-gray-300 rounded-full shadow-sm transition-transform duration-200 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} aria-hidden="true" />
            <span className="sr-only">Alternar tema</span>
          </button>

          <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-full border border-gray-200 dark:border-gray-600" role="status" aria-live="polite" aria-label="Itens no carrinho">
            <span aria-hidden="true">🛒</span>
            <span className="min-w-[1.5em] text-center font-bold text-blue-500 dark:text-blue-400">{cartCount}</span>
          </div>
        </nav>
      </div>
    </header>
  );
}