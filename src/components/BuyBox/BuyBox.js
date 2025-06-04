import React from "react";
import styles from "./BuyBox.module.css";
// Importe o ícone de estrela (ajuste o caminho se necessário)
import { ReactComponent as StarIcon } from "../../assets/icons/star-icon.svg"; // Conforme README

const BuyBox = ({
  name,
  reference,
  stars, // ex: 4.7
  rating, // ex: "90 avaliações"
  price, // Preço original
  priceDiscount, // Preço com desconto
  description,
  children, // Para ProductOptions
  onBuy, // Função para o clique do botão comprar
}) => {
  const formatCurrency = (value) => {
    if (typeof value !== "number") return value;
    return `R$ ${value.toFixed(2).replace(".", ",")}`;
  };

  const hasDiscount =
    typeof priceDiscount === "number" && priceDiscount < price;

  return (
    <div className={styles.buyBoxContainer}>
      {name && <h1 className={styles.productName}>{name}</h1>}
      {reference && <p className={styles.productReference}>REF: {reference}</p>}

      {typeof stars === "number" && rating && (
        <div className={styles.ratingSection}>
          <span className={styles.starRatingBox}>
            {stars.toFixed(1)} {/* Exibe uma casa decimal para as estrelas */}
            <StarIcon />
          </span>
          <span className={styles.ratingText}>({rating})</span>
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

      <button onClick={onBuy} className={styles.buyButton} type="button">
        Comprar
      </button>
    </div>
  );
};

export default BuyBox;
