import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import { ReactComponent as SearchIconSVG } from "../../assets/icons/search-icon.svg";
import { ReactComponent as CartIconSVG } from "../../assets/icons/cart-icon.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu-hamburger.svg"; // Ícone Hambúrguer
import { ReactComponent as CloseIcon } from "../../assets/icons/close-icon.svg"; // Ícone 'X'
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { cartItemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      navigate(`/produtos?filter=${encodeURIComponent(trimmedSearchTerm)}`);
    }
  };

  const handleLogout = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkClassName = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  const mobileNavLinkClassName = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  return (
    <>
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
              <SearchIconSVG />
            </button>
          </form>

          {/* Área de usuário e carrinho para DESKTOP */}
          <div className={styles.userActions}>
            {isAuthenticated ? (
              <>
                <div className={styles.welcomeMessage}>
                  <span>Olá,</span>
                  <span className={styles.userName}>{user.name}</span>
                </div>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className={styles.registerLink}>
                  Cadastre-se
                </Link>
                <Link to="/login" className={styles.loginButton}>
                  Entrar
                </Link>
              </>
            )}

            <Link
              to="/cart"
              className={styles.cartLink}
              aria-label={`Carrinho com ${cartItemCount} itens`}
            >
              <CartIconSVG className={styles.cartIcon} />
              {cartItemCount > 0 && (
                <span className={styles.cartCountBadge}>{cartItemCount}</span>
              )}
            </Link>
          </div>

          {/* Ícone do menu hambúrguer para MOBILE */}
          <button
            onClick={toggleMobileMenu}
            className={styles.mobileMenuButton}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Navegação Principal para DESKTOP */}
        <nav className={styles.mainNav}>
          <NavLink to="/" className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/produtos" className={navLinkClassName}>
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

      {/* Navegação para MOBILE (Drawer/Sidebar) */}
      <nav
        className={`${styles.mobileNav} ${
          isMobileMenuOpen ? styles.mobileNavOpen : ""
        }`}
      >
        <NavLink
          to="/"
          className={mobileNavLinkClassName}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/produtos"
          className={mobileNavLinkClassName}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Produtos
        </NavLink>
        <NavLink
          to="/categories"
          className={mobileNavLinkClassName}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Categorias
        </NavLink>
        <NavLink
          to="/my-orders"
          className={mobileNavLinkClassName}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Meus Pedidos
        </NavLink>

        <div className={styles.userActions}>
          {isAuthenticated ? (
            <>
              <div className={styles.welcomeMessage}>
                <span>Olá,</span>
                <span className={styles.userName}>{user.name}</span>
              </div>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${styles.loginButton} ${styles.mobileNav}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className={`${styles.registerLink} ${styles.mobileNav}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cadastre-se
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
