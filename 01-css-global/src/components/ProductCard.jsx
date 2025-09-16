// Card de produto com estados de loading, hover, focus e acessibilidade
import React, { useState } from 'react'; // Importa React e hook useState
// Removemos o import do CSS Module
// import styles from './ProductCard.module.css';

// Função utilitária para formatar preço em BRL
const formatPrice = (v) => {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Componente ProductCard
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

  // Renderiza o card (skeleton ou conteúdo real)
  if (loading) {
    return (
      <article className="card-skeleton" aria-busy="true" aria-label="Produto carregando">
        <div className="media skeleton" />
        <div className="content">
          <div className="title skeleton" />
          <div className="price skeleton" />
          <div className="rating skeleton" />
          <div className="actions">
            <div className="button skeleton" />
          </div>
        </div>
      </article>
    );
  }

  // Conteúdo do card quando não está carregando
  return (
    <article className="product-card" aria-label={product.title} tabIndex="0">
      <div className="badges">
        {product.tag && (
          <span className="badge" aria-label={`Tag: ${product.tag}`}>{product.tag}</span>
        )}
      </div>

      <a href="#" className="media-link" aria-label={`Ver detalhes de ${product.title}`}>
        <img
          className="media"
          src={product.image}
          alt={product.title}
          loading="lazy"
          width="512"
          height="512"
        />
      </a>

      <div className="content">
        <h2 className="title" title={product.title}>
          {product.title}
        </h2>

        <p className="price">
          {formatPrice(product.price)}
        </p>

        <div className="rating" role="img" aria-label={ratingLabel}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} aria-hidden="true">
              {i < Math.round(product.rating) ? '★' : '☆'}
            </span>
          ))}
        </div>

        <div className="actions">
          <button
            type="button"
            className={`button button-${buttonVariant}`} // Usa classes globais
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