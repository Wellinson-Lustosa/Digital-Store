import React from "react";
import { Link } from "react-router-dom";
import Section from "../../components/Section/Section";
import styles from "./WishlistPage.module.css";

const MyOrdersPage = () => {
  // Simulação: verificar se o usuário está logado (substituir por lógica real de auth)
  const isLoggedIn = false; // Mude para true para ver o conteúdo de "logado"

  return (
    <div className={styles.pageContainer}>
      <Section title="Meus Pedidos" noBorderTop>
        {isLoggedIn ? (
          <div>
            <p>Aqui você poderá visualizar o histórico dos seus pedidos.</p>
            {/* Aqui viria a listagem de pedidos */}
          </div>
        ) : (
          <p className={styles.loginPrompt}>
            Você precisa estar logado para ver seus pedidos.
            <Link to="/login" className={styles.loginLink}>
              {" "}
              Fazer Login
            </Link>{" "}
            ou
            <Link to="/register" className={styles.loginLink}>
              {" "}
              Cadastre-se
            </Link>
            .
          </p>
        )}
      </Section>
    </div>
  );
};

export default MyOrdersPage;
