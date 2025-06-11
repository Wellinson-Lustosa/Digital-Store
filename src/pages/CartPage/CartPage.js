import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import Section from "../../components/Section/Section";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();

  const formatCurrency = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;

  if (cartItems.length === 0) {
    return (
      <div className={styles.pageContainer}>
        <Section noBorderTop>
          <div className={styles.emptyCart}>
            <h2 className={styles.emptyCartTitle}>Seu carrinho está vazio.</h2>
            <p>Adicione produtos para vê-los aqui!</p>
            <Link to="/produtos" className={styles.emptyCartLink}>
              Ver Produtos
            </Link>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Section title="Meu Carrinho" noBorderTop>
        <div className={styles.cartGrid}>
          <div className={styles.cartItemsList}>
            {cartItems.map((item) => (
              <div key={item.variantId} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.itemOptions}>
                    {Object.entries(item.selectedOptions).map(
                      ([key, value]) => (
                        <span key={key}>
                          {key}: {value}{" "}
                        </span>
                      )
                    )}
                  </div>
                  <p className={styles.itemPrice}>
                    {formatCurrency(item.priceDiscount ?? item.price)}
                  </p>
                  <div className={styles.itemActions}>
                    <div className={styles.quantityControl}>
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        aria-label="Diminuir quantidade"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className={styles.quantityInput}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.variantId,
                            parseInt(e.target.value, 10) || 1
                          )
                        }
                        aria-label="Quantidade"
                      />
                      <button
                        type="button"
                        className={styles.quantityButton}
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className={styles.removeItemButton}
                      onClick={() => removeFromCart(item.variantId)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>
            <div className={styles.summaryLine}>
              <span>Subtotal</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <div className={styles.summaryLine}>
              <span>Frete</span>
              <span>Grátis</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <button className={styles.checkoutButton} type="button">
              Finalizar Compra
            </button>
            <button
              className={styles.clearCartButton}
              type="button"
              onClick={clearCart}
            >
              Esvaziar Carrinho
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CartPage;
