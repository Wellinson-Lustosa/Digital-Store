import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { ReactComponent as SearchIconSVG } from "../../assets/icons/search-icon.svg"; // Renomeado para clareza
import { ReactComponent as CartIconSVG } from "../../assets/icons/cart-icon.svg"; // Renomeado para clareza

// 1. Importe o arquivo de Módulo CSS
import styles from "./Header.module.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?filter=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // A lógica de estilo do NavLink agora pode usar as classes do CSS Module
  const navLinkClassName = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  return (
    // 2. Use as classes do objeto 'styles'
    <header className={styles.headerContainer}>
      <div className={styles.topRow}>
        <Logo />

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar produto..."
            className={styles.searchInput}
          />
          <button
            type="submit"
            className={styles.searchButton}
            aria-label="Buscar"
          >
            <SearchIconSVG
              style={{ width: "20px", height: "20px", fill: "#474747" }}
            />
          </button>
        </form>

        <div className={styles.userActions}>
          <Link to="/register" className={styles.registerLink}>
            Cadastre-se
          </Link>
          <Link to="/login" className={styles.loginButton}>
            Entrar
          </Link>
          <CartIconSVG className={styles.cartIcon} />
        </div>
      </div>

      <nav className={styles.mainNav}>
        <NavLink to="/" className={navLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/products" className={navLinkClassName}>
          Produtos
        </NavLink>
        <NavLink to="/categories" className={navLinkClassName}>
          Categorias
        </NavLink>
        <NavLink to="/my-orders" className={navLinkClassName}>
          Meus Pedidos
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
