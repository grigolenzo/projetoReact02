import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard.jsx';

const Grid = styled.section`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 481px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (min-width: 769px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  @media (min-width: 1025px) { grid-template-columns: repeat(4, minmax(0, 1fr)); }
`;

export default function Catalog({ products, onAdd }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 900); return () => clearTimeout(t); }, []);

  return (
    <Grid aria-label="Lista de produtos">
      {loading ? Array.from({ length: 6 }).map((_, i) => <ProductCard key={`s-${i}`} loading />) : products.map(p => <ProductCard key={p.id} product={p} onAdd={() => onAdd(p.id)} buttonVariant={p.buttonVariant} />)}
    </Grid>
  );
}
