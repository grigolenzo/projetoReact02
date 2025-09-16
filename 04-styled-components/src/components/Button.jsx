import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  font-weight: 700;
  transition: transform 180ms ease, opacity 180ms ease;
  &:disabled { opacity: 0.6; cursor: not-allowed; }

  ${(p) => p.variant === 'solid' && css`
    background: ${p => p.theme.accent}; color: #fff;
  `}
  ${(p) => p.variant === 'outline' && css`
    background: transparent; color: ${p => p.theme.accent}; border-color: ${p => p.theme.accent};
  `}
  ${(p) => p.variant === 'ghost' && css`
    background: transparent; color: ${p => p.theme.fgStrong};
  `}
`;

export default function Button({ children, variant = 'solid', ...props }){
  return <StyledButton variant={variant} {...props}>{children}</StyledButton>;
}
