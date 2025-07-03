import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderConfirmationPage.module.css";

const OrderConfirmationPage = () => {
  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.confirmationIcon}>
        &#10004; {/* Símbolo de checkmark (✓) */}
      </div>
      <h1 className={styles.confirmationTitle}>
        Pedido Realizado com Sucesso!
      </h1>
      <p className={styles.confirmationText}>
        Obrigado pela sua compra. Enviamos um e-mail de confirmação com os
        detalhes do seu pedido.
      </p>
      <Link to="/" className={styles.backHomeLink}>
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
