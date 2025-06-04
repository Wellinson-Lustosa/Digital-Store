import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Para links internos da aplicação
import styles from "./Section.module.css";

const Section = ({
  title,
  titleAlign = "left", // Padrão 'left'
  link, // Objeto: { text: "Ver mais", href: "/produtos" } ou { text: "Site Externo", href: "https://..." }
  children,
  className, // Para classes CSS externas adicionais
  noBorderTop = false, // Para controlar a borda superior
}) => {
  const containerClasses = [
    styles.sectionContainer,
    noBorderTop ? styles.noBorderTop : "", // Lembre-se de definir .noBorderTop em Section.module.css
    className || "",
  ]
    .join(" ")
    .trim();

  const titleClasses = [
    styles.sectionTitle,
    titleAlign === "center" ? styles.titleAlignCenter : styles.titleAlignLeft,
  ].join(" ");

  // Verifica se o link é interno (começa com '/') ou externo
  const isInternalLink = link && link.href && link.href.startsWith("/");

  return (
    <section className={containerClasses}>
      {(title || link) && (
        <div className={styles.sectionHeader}>
          {title && <h2 className={titleClasses}>{title}</h2>}
          {link && link.text && link.href && (
            isInternalLink ? (
              <RouterLink to={link.href} className={styles.sectionLink}>
                {link.text}
              </RouterLink>
            ) : (
              <a
                href={link.href}
                className={styles.sectionLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
            )
          )}
        </div>
      )}
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
};

export default Section;
