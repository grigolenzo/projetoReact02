// Card de produto com estados de loading, hover, focus e acessibilidade
import React, { useState } from 'react';

const formatPrice = v => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Componente ProductCard
export default function ProductCard({ product, onAdd, loading = false, variant = 'solid' }) { // Declara o componente com props
  const [pending, setPending] = useState(false); // Estado local para simular operação de adicionar

  // Manipula clique no botão "Adicionar"
  const handleAdd = () => {
    if (pending || loading) return;
    setPending(true);
    setTimeout(() => {
      onAdd && onAdd(product.id);
      setPending(false);
    }, 600);
  };

  const btnBase = 'py-2 px-4 rounded-lg font-semibold focus-visible:ring-2 focus-visible:ring-blue-500 transition-fast';
  const variants = {
    solid: 'bg-blue-600 text-white shadow hover:bg-blue-700',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700',
 };

  // Renderiza o card (skeleton ou conteúdo real)
  if (loading) {
    return (
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse" aria-busy="true" aria-label="Produto carregando">
        <div className="w-full aspect-square placeholder-image" />
        <div className="p-4 flex flex-col gap-2">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full" />
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 mt-4" />
        </div>
      </article>
    );
  }

  // Conteúdo do card quando não está carregando
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg focus-within:ring-4 focus-within:ring-blue-500/30 transition-transform duration-200" tabIndex="0" aria-label={product.title}>
      <div className="relative">
        {product.tag && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${product.tag === 'Novo' ? 'bg-green-500' : 'bg-red-500'}`} aria-label={`Tag ${product.tag}`}>{product.tag}</span>
        )}
        <img
          className="w-full aspect-square object-cover"
          src={product.image}
          alt={product.title}
          loading="lazy"
          width="512"
          height="512"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate-2-lines" title={product.title}>{product.title}</h3>
        <div className="text-xl font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</div>
        <div className="text-yellow-400" role="img" aria-label={`${product.rating} de 5 estrelas`}>
          {Array.from({ length: 5 }).map((_, i) => <span key={i} aria-hidden="true">{i < Math.round(product.rating) ? '★' : '☆'}</span>)}
        </div>
        <div className="mt-auto">
          <button
            type="button"
            className={`${btnBase} ${variants[variant]} ${pending ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={handleAdd}
            disabled={pending}
            aria-busy={pending}
            aria-disabled={pending}
          >
            {pending ? 'Adicionando…' : 'Adicionar'}
          </button>
        </div>
      </div>
    </article>
  );
}