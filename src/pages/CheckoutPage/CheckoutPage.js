import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import Section from "../../components/Section/Section";
import styles from "./CheckoutPage.module.css";

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Estados para o formulário (pré-populados com dados do usuário, se disponíveis)
  const [shippingInfo, setShippingInfo] = useState({
    fullName:
      user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
    email: user?.email || "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Validação simples
    if (
      !shippingInfo.fullName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.zipCode
    ) {
      alert("Por favor, preencha todos os campos de entrega.");
      return;
    }

    console.log("Pedido Finalizado:", {
      user: user,
      shippingInfo: shippingInfo,
      items: cartItems,
      total: cartTotal,
    });

    // Limpa o carrinho
    clearCart();

    // Redireciona para a página de confirmação
    navigate("/order-confirmation");
  };

  const formatCurrency = (value) => `R$ ${value.toFixed(2).replace(".", ",")}`;

  return (
    <div className={styles.pageContainer}>
      <Section title="Finalizar Compra" noBorderTop>
        <form className={styles.checkoutLayout} onSubmit={handlePlaceOrder}>
          {/* Coluna do Formulário de Entrega */}
          <div className={styles.shippingForm}>
            <h3 className={styles.formTitle}>Endereço de Entrega</h3>
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.formLabel}>
                Nome Completo
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={styles.formInput}
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                E-mail de Contato
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.formInput}
                value={shippingInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.formLabel}>
                Endereço
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className={styles.formInput}
                placeholder="Rua, Número, Bairro"
                value={shippingInfo.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.formLabel}>
                  Cidade
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className={styles.formInput}
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="zipCode" className={styles.formLabel}>
                  CEP
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className={styles.formInput}
                  value={shippingInfo.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Coluna do Resumo do Pedido */}
          <aside className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>Resumo do Pedido</h3>
            {cartItems.map((item) => (
              <div key={item.variantId} className={styles.summaryItem}>
                <span className={styles.itemName}>
                  {item.name} (x{item.quantity})
                </span>
                <span>
                  {formatCurrency(
                    (item.priceDiscount ?? item.price) * item.quantity
                  )}
                </span>
              </div>
            ))}
            <hr className={styles.summaryDivider} />
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <button type="submit" className={styles.placeOrderButton}>
              Finalizar Pedido
            </button>
          </aside>
        </form>
      </Section>
    </div>
  );
};

export default CheckoutPage;
