import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  padding: 1rem;
  background: ${(p) => p.theme.surface};
  box-shadow: ${(p) => p.theme.shadows.sm};
`;

const Content = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(NavLink)`
  font-weight: 700;
  font-size: 1.125rem;
  color: ${(p) => p.theme.fgStrong};
  text-decoration: none;
  &:focus {
    outline: 3px solid ${(p) => p.theme.focus};
    outline-offset: 2px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ThemeToggle = styled.button`
  width: 3.5rem;
  height: 2rem;
  border-radius: 9999px;
  border: none;
  background: ${(p) => p.theme.surface2};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:focus { outline: 3px solid ${(p) => p.theme.focus}; outline-offset: 2px; }
`;

const Cart = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CartCount = styled.span`
  background: ${(p) => p.theme.accent};
  color: #fff;
  width: 1.25rem;
  height: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-weight: 700;
`;

export default function Navbar({ cartCount, theme, onToggleTheme }) {
  return (
    <Header role="banner">
      <Content>
  <Logo to="/" aria-label="Ir para página inicial">🛍️ <span style={{ marginLeft: 6 }}>Shop<span style={{ color: '#5b7cfa' }}>TechLoja</span></span></Logo>
        <Actions>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14, color: 'inherit' }} aria-hidden>{theme === 'dark' ? '🌙' : '☀️'}</span>
            <ThemeToggle onClick={onToggleTheme} aria-pressed={theme === 'dark'} aria-label={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}>
              <span style={{ display: 'block', width: 20, height: 20, borderRadius: 9999, background: theme === 'dark' ? '#fff' : '#111' }} aria-hidden />
            </ThemeToggle>
          </div>
          <Cart aria-live="polite" aria-label="Itens no carrinho">
            <span aria-hidden>🛒</span>
            <CartCount aria-label={`${cartCount} itens no carrinho`}>{cartCount}</CartCount>
          </Cart>
        </Actions>
      </Content>
    </Header>
  );
}
