// Barra de navegação fixa com navegação entre Catálogo e Kanban
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ cartCount, theme, onToggleTheme }) {
	return (
		<header className="header">
			<div className="content">
				<NavLink to="/" className="logo" aria-label="Página inicial">
					<span aria-hidden>🛍️</span>
					<strong className="logoText">Shop <span className="dot">TechLoja</span></strong>
				</NavLink>

				<nav className="actions" aria-label="Ações e navegação">
					<div className="navLinks" role="navigation" aria-label="Seções">
						<NavLink to="/" className={({ isActive }) => isActive ? 'navLink active' : 'navLink'} aria-label="Ir para Catálogo">Catálogo</NavLink>
						<NavLink to="/kanban" className={({ isActive }) => isActive ? 'navLink active' : 'navLink'} aria-label="Ir para Kanban">Kanban</NavLink>
					</div>

					<button
						type="button"
						className="themeToggle"
						onClick={onToggleTheme}
						aria-label={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
						aria-pressed={theme === 'dark'}
					>
						<span className="themeThumb" aria-hidden>{theme === 'dark' ? '🌙' : '☀️'}</span>
						<span className="themeText">{theme === 'dark' ? 'Escuro' : 'Claro'}</span>
					</button>

					<div className="cart" role="status" aria-live="polite" aria-label="Itens no carrinho">
						<span className="cartIcon" aria-hidden>🛒</span>
						<span className="cartCount" aria-label={`${cartCount} itens no carrinho`}>{cartCount}</span>
					</div>
				</nav>
			</div>
		</header>
	);
}