import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  // Props conforme README: product.image, product.name, product.price, product.priceDiscount
  const { image, name, price, priceDiscount, id } = product;

  const formatCurrency = (value) => {
    if (typeof value !== 'number') return value;
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  const hasDiscount = typeof priceDiscount === 'number' && priceDiscount < price;

  return (
    <Link to={`/product/${id || 'default-id'}`} className={styles.cardLink}>
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          <img
            src={image || 'https://via.placeholder.com/292x321.png?text=Produto'}
            alt={name || 'Nome do Produto'}
            className={styles.productImage}
          />
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{name || 'Nome do Produto'}</h3>
          
          <div className={styles.priceSection}>
            {hasDiscount ? (
              <>
                <span className={styles.discountPrice}>
                  {formatCurrency(priceDiscount)}
                </span>
                <span className={styles.originalPriceStrikethrough}>
                  {formatCurrency(price)}
                </span>
              </>
            ) : (
              <span className={styles.originalPrice}>
                {formatCurrency(price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;