import React from 'react';
import { Link } from 'react-router-dom'; // Ou apenas <a> se não for link de navegação interna imediata
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  // Props conforme README: product.image, product.name, product.price, product.priceDiscount
  const { image, name, price, priceDiscount, id } = product; // Supondo que 'id' seja usado para o link

  const formatCurrency = (value) => {
    if (typeof value !== 'number') return value; // Retorna o valor original se não for número
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const hasDiscount = typeof priceDiscount === 'number' && priceDiscount < price;

  return (
    // O sketch do README para ProductCard não mostra um botão "Ver produto",
    // então o card inteiro pode ser um link ou apenas exibir informações.
    // Vamos assumir que o card é clicável e leva à página do produto.
    <Link to={`/product/${id || 'default-id'}`} className={styles.imageLink}> {/* Usando imageLink para o Link */}
      <div className={styles.cardContainer}>
        <img
          src={image || 'https://via.placeholder.com/292x321.png?text=Produto'}
          alt={name || 'Nome do Produto Indisponível'}
          className={styles.productImage} // Dimensões definidas no CSS
        />
        <h3 className={styles.productName}>{name || 'Nome do Produto'}</h3>
        
        <div className={styles.priceSection}>
          {hasDiscount ? (
            <>
              <span className={styles.originalPriceStrikethrough}>
                {formatCurrency(price)}
              </span>
              <span className={styles.discountPrice}>
                {formatCurrency(priceDiscount)}
              </span>
            </>
          ) : (
            <span className={styles.originalPrice}>
              {formatCurrency(price)}
            </span>
          )}
        </div>
        {/* O botão "Ver Produto" foi removido para seguir mais de perto o sketch do product-card.png do README,
            que não o exibe. Se for necessário, podemos readicioná-lo. */}
      </div>
    </Link>
  );
};

export default ProductCard;