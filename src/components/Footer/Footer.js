import React from "react";
import Logo from "../Logo/Logo"; // Logo já está pronto para variant="white"
import InformationComponent from "./InformationComponent";
import styles from "./Footer.module.css";

// Importe seus ícones SVG de src/assets/ (ajuste os nomes/caminhos)
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook-icon.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/instagram-icon.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter-icon.svg";

const Footer = () => {
  // Dados para as colunas de informação (conforme README seção 3.2.1)
  const infoColumn1 = {
    title: "Informações",
    informations: [
      { text: "Sobre Drip Store", link: "/about" },
      { text: "Segurança", link: "/security" },
      { text: "Wishlist", link: "/wishlist" },
      { text: "Trabalhe conosco", link: "/careers" },
    ],
  };

  const infoColumn2 = {
    title: "Ajuda",
    informations: [
      { text: "Formas de Pagamento", link: "/payment-methods" },
      { text: "Perguntas Frequentes", link: "/faq" },
      { text: "Blog", link: "/blog" },
      { text: "Meus Pedidos", link: "/my-orders" },
    ],
  };

  const infoColumn3 = {
    title: "Políticas",
    informations: [
      { text: "Política de Privacidade", link: "/privacy" },
      { text: "Termos de Uso", link: "/terms" },
      {
        text: "Contato: email@digitalstore.com",
        link: "mailto:email@digitalstore.com",
      },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContentWrapper}>
        <div className={styles.companyInfo}>
          <Logo variant="white" />
          <p className={styles.companyDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam.
          </p>
          <div className={styles.socialIconsContainer}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Twitter"
            >
              <TwitterIcon />
            </a>
          </div>
        </div>

        {/* Componentes de Informação (Seção 3.2.1 do README) */}
        <InformationComponent
          title={infoColumn1.title}
          informations={infoColumn1.informations}
        />
        <InformationComponent
          title={infoColumn2.title}
          informations={infoColumn2.informations}
        />
        <InformationComponent
          title={infoColumn3.title}
          informations={infoColumn3.informations}
        />
      </div>

      <hr className={styles.footerDivider} />

      <p className={styles.copyrightText}>
        © {currentYear} Digital Store
      </p>
    </footer>
  );
};

export default Footer;
