import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// 1. Importe o CSS Module
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    // 2. Aplique as classes
    <div className={styles.layoutContainer}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
