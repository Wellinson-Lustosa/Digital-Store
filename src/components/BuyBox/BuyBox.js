import React from "react";
import styles from "./BuyBox.module.css";
import { ReactComponent as StarIcon } from "../../assets/icons/star-icon.svg";
import { useCart } from "../../contexts/CartContext"; // 1. Importe useCart

const BuyBox = ({ product, onBuy, children }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const {
    name,
    sku,
    averageRating,
    totalReviews,
    price,
    priceDiscount,
    description,
  } = product;

  const formatCurrency = (value) =>
    value?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const hasDiscount = typeof priceDiscount === "number" && priceDiscount < price;

  const handleBuyClick = () => {
    if (onBuy) {
      onBuy();
    } else {
      console.warn(
        "Ação de compra não definida para o BuyBox. Usando addToCart padrão sem opções específicas."
      );
      addToCart(product, 1, {});
    }
  };

  return (
    <div className={styles.buyBoxContainer}>
      {name && <h1 className={styles.productName}>{name}</h1>}
      {sku && <p className={styles.productReference}>REF: {sku}</p>}

      {typeof averageRating === "number" && totalReviews > 0 && (
        <div className={styles.ratingSection}>
          <span className={styles.starRatingBox}>
            {averageRating.toFixed(1)}
            <StarIcon />
          </span>
          <span className={styles.ratingText}>
            ({totalReviews}{" "}
            {totalReviews > 1 ? "avaliações" : "avaliação"})
          </span>
        </div>
      )}

      {typeof price === "number" && (
        <div className={styles.priceDisplay}>
          {hasDiscount ? (
            <>
              <span className={styles.currentPrice}>
                {formatCurrency(priceDiscount)}
              </span>
              <span className={styles.originalPriceStrikethrough}>
                {formatCurrency(price)}
              </span>
            </>
          ) : (
            <span className={styles.currentPrice}>{formatCurrency(price)}</span>
          )}
        </div>
      )}

      {description && (
        <p className={styles.productDescription}>{description}</p>
      )}

      {children && <div className={styles.optionsSection}>{children}</div>}

      <button
        onClick={handleBuyClick}
        className={styles.buyButton}
        type="button"
      >
        Comprar
      </button>
    </div>
  );
};

export default BuyBox;
