// Barra de navegação fixa com navegação entre Catálogo e Kanban
import React from 'react'; // Importa React
import { NavLink } from 'react-router-dom'; // Importa NavLink para rotas ativas
// Removemos a importação de CSS Modules
// import styles from './Navbar.module.css';

// Componente Navbar com props
export default function Navbar({ cartCount, theme, onToggleTheme }) { // Declara componente
  return ( // Retorna JSX
    <header className="header"> {/* Usa classe global */}
      <div className="content"> {/* Usa classe global */}
        <NavLink to="/" className="logo" aria-label="Página inicial"> {/* Usa classe global */}
          <span aria-hidden="true">🛍️</span> {/* Ícone visual */}
          <strong>Shop</strong> {/* Texto do logo */}
          <span className="dot" aria-hidden="true">.</span> {/* Ponto decorativo */}
        </NavLink> {/* Fecha logo */}

        <nav className="actions" aria-label="Ações e navegação"> {/* Usa classe global */}
          <div className="navLinks" role="navigation" aria-label="Seções"> {/* Usa classe global */}
            <NavLink
              to="/" // Rota do catálogo
              className={({ isActive }) => isActive ? 'navLink active' : 'navLink'} // Classes globais concatenadas
              aria-label="Ir para Catálogo" // Rótulo acessível
            > {/* Abre link */}
              Catálogo {/* Texto do link */}
            </NavLink> {/* Fecha link Catálogo */}

            <NavLink
              to="/kanban" // Rota do kanban
              className={({ isActive }) => isActive ? 'navLink active' : 'navLink'} // Classes globais concatenadas
              aria-label="Ir para Kanban" // Rótulo acessível
            > {/* Abre link */}
              Kanban {/* Texto do link */}
            </NavLink> {/* Fecha link Kanban */}
          </div> {/* Fecha navLinks */}

          <button
            type="button" // Tipo de botão
            className="themeToggle" // Usa classe global
            onClick={onToggleTheme} // Alterna tema
            aria-label={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'} // Rótulo
            aria-pressed={theme === 'dark'} // Estado pressionado
          > {/* Abre botão */}
            <span className="themeThumb" aria-hidden="true" /> {/* Usa classe global */}
            <span className="themeText"> {/* Usa classe global */}
              {theme === 'dark' ? 'Escuro' : 'Claro'} {/* Texto */}
            </span> {/* Fecha span */}
          </button> {/* Fecha botão tema */}

          <div className="cart" role="status" aria-live="polite" aria-label="Itens no carrinho"> {/* Usa classe global */}
            <span className="cartIcon" aria-hidden="true">🛒</span> {/* Usa classe global */}
            <span className="cartCount">{cartCount}</span> {/* Usa classe global */}
          </div> {/* Fecha carrinho */}
        </nav> {/* Fecha ações */}
      </div> {/* Fecha contêiner */}
    </header> // Fecha cabeçalho
  ); // Fim do return
} // Fim do componente Navbar