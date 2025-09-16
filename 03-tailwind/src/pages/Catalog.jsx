// Página de Catálogo reutilizando ProductCard e grid responsivo
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

// Define o componente de página de catálogo
export default function Catalog({ products, onAdd }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
      aria-label="Lista de produtos"
    >
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <ProductCard key={'skeleton-' + i} loading />
          ))
        : products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={() => onAdd(p.id)}
              buttonVariant={p.buttonVariant}
            />
          ))}
    </section>
  );
}