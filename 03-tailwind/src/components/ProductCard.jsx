import React, { useState } from 'react';

const formatPrice = (v) => {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export default function ProductCard({ product, onAdd, buttonVariant = 'solid', loading = false }) {
  const [pending, setPending] = useState(false);
  const ratingLabel = product ? `${product.rating} de 5 estrelas` : 'Carregando';

  const handleClick = () => {
    if (!product || pending) return;
    setPending(true);
    setTimeout(() => {
      onAdd(product.id);
      setPending(false);
    }, 600);
  };

  const getButtonClasses = (variant) => {
    const baseClasses = 'w-full py-2 px-4 rounded-lg font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent';
    switch (variant) {
      case 'solid':
        return `${baseClasses} bg-accent text-white hover:bg-opacity-90`;
      case 'outline':
        return `${baseClasses} bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-white`;
      case 'ghost':
        return `${baseClasses} bg-transparent text-fg-strong hover:bg-surface-2`;
      default:
        return baseClasses;
    }
  };

  if (loading) {
    return (
      <article className="bg-surface rounded-lg shadow-sm overflow-hidden transition-all duration-200" aria-busy="true" aria-label="Produto carregando">
        <div className="aspect-square w-full animate-pulse bg-skeleton" />
        <div className="flex flex-col space-y-2 p-4">
          <div className="h-5 w-4/5 animate-pulse bg-skeleton rounded" />
          <div className="h-4 w-1/2 animate-pulse bg-skeleton rounded" />
          <div className="h-4 w-1/3 animate-pulse bg-skeleton rounded" />
          <div className="mt-4">
            <div className="h-10 w-full animate-pulse bg-skeleton rounded-lg" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-surface rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md focus-within:shadow-md" aria-label={product.title}>
      <div className="absolute top-2 right-2 z-10">
        {product.tag && (
          <span className="bg-accent text-white text-xs font-semibold py-1 px-2 rounded-full" aria-label={`Tag: ${product.tag}`}>
            {product.tag}
          </span>
        )}
      </div>

      <a href="#" className="relative block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent rounded-t-lg" aria-label={`Ver detalhes de ${product.title}`}>
        <img
          className="aspect-square w-full object-cover"
          src={product.image}
          alt={product.title}
          loading="lazy"
          width="512"
          height="512"
        />
      </a>

      <div className="flex flex-col space-y-2 p-4">
        <h2 className="text-lg font-semibold text-fg-strong leading-tight line-clamp-2" title={product.title}>
          {product.title}
        </h2>
        <p className="text-xl font-bold text-fg">
          {formatPrice(product.price)}
        </p>

        <div className="text-star text-base" role="img" aria-label={ratingLabel}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} aria-hidden="true">
              {i < Math.round(product.rating) ? '★' : '☆'}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <button
            type="button"
            className={getButtonClasses(buttonVariant)}
            onClick={handleClick}
            disabled={pending}
            aria-disabled={pending}
            aria-busy={pending}
          >
            {pending ? 'Adicionando…' : 'Adicionar'}
          </button>
        </div>
      </div>
    </article>
  );
}