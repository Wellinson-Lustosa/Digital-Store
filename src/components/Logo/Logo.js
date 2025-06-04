import React from "react";
// Importe as imagens do logo de src/assets/
// Certifique-se que esses arquivos existem e os nomes/caminhos estão corretos.
import logoDefault from "../../assets/icons/logo-header.svg"; // Exemplo de nome para o logo padrão
import logoWhite from "../../assets/icons/logo-footer.svg"; // Exemplo de nome para o logo branco

import styles from "./Logo.module.css";

const Logo = ({ variant = "default", className }) => {
  // A lógica para selecionar a imagem correta permanece a mesma
  const logoSrc = variant === "white" ? logoWhite : logoDefault;

  const combinedClassName = `${styles.logoImage} ${className || ""}`.trim();

  return (
    // O README não especifica se o logo em si é um link para a home,
    // mas é uma prática comum. O sketch do header mostra o logo como parte da navegação.
    <a href="/" aria-label="Página inicial da Digital Store">
      <img
        src={logoSrc}
        alt="Logo Digital Store"
        className={combinedClassName}
        // As dimensões são aplicadas via CSS Module (253x44px)
      />
    </a>
  );
};

export default Logo;
