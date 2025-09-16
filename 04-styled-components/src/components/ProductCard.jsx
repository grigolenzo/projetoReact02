import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Button from './Button.jsx';
import Skeleton from './Skeleton.jsx';

const shine = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Card = styled.article`
  background: ${(p) => p.theme.surface};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${(p) => p.theme.shadows.xs};
  transition: box-shadow 200ms ease, transform 200ms ease;
  &:hover { box-shadow: ${(p) => p.theme.shadows.md}; transform: translateY(-4px); }
  &:focus-within { outline: 3px solid ${(p) => p.theme.focus}; }
`;

const Media = styled.div`
  aspect-ratio: 1 / 1;
  background: ${(p) => p.theme.surface2};
  display: block;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Badge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${(p) => p.theme.accent};
  color: white;
  padding: 4px 8px;
  border-radius: 9999px;
  font-weight: 700;
`;

const Content = styled.div`
  padding: 12px;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Price = styled.p`
  font-weight: 800;
  margin: 8px 0;
`;

const Rating = styled.div`
  color: ${(p) => p.theme.star};
`;

const Actions = styled.div`
  margin-top: 8px;
`;

export default function ProductCard({ product, onAdd, buttonVariant = 'solid', loading = false }) {
  const [pending, setPending] = useState(false);
  const handleClick = () => {
    if (!product || pending) return;
    setPending(true);
    setTimeout(() => {
      onAdd(product.id);
      setPending(false);
    }, 600);
  };

  if (loading) {
    return (
      <Card aria-busy="true" aria-label="Carregando produto">
        <Skeleton style={{ aspectRatio: '1 / 1' }} />
        <Content>
          <Skeleton style={{ height: 18, width: '80%', marginBottom: 8 }} />
          <Skeleton style={{ height: 20, width: '50%', marginBottom: 8 }} />
          <Skeleton style={{ height: 36, width: '100%' }} />
        </Content>
      </Card>
    );
  }

  return (
    <Card tabIndex={0}>
      <Media>
        <Img src={product.image} alt={product.title} loading="lazy" />
      </Media>
      <Content>
        {product.tag && <Badge>{product.tag}</Badge>}
        <Title title={product.title}>{product.title}</Title>
        <Price>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Price>
        <Rating aria-label={`${product.rating} de 5 estrelas`}>{Array.from({ length: 5 }).map((_, i) => (<span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>))}</Rating>
        <Actions>
          <Button variant={buttonVariant} onClick={handleClick} disabled={pending} aria-busy={pending}>{pending ? 'Adicionando…' : 'Adicionar'}</Button>
        </Actions>
      </Content>
    </Card>
  );
}
