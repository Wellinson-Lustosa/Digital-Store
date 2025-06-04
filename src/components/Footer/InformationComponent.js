import React from "react";
import { Link } from "react-router-dom";
// 1. Importe o CSS Module
import styles from "./InformationComponent.module.css";

const InformationComponent = ({ title, informations }) => {
  if (!informations || informations.length === 0) {
    return null; // Ou alguma mensagem placeholder se preferir
  }

  return (
    // 2. Aplique as classes
    <div className={styles.infoBlock}>
      <h4 className={styles.infoTitle}>{title}</h4>
      <ul className={styles.infoList}>
        {informations.map((info, index) => (
          <li key={index} className={styles.infoListItem}>
            {/* Verifica se o link é externo ou interno */}
            {info.link && info.link.startsWith("http") ? (
              <a
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.infoLink}
              >
                {info.text}
              </a>
            ) : (
              <Link to={info.link || "#"} className={styles.infoLink}>
                {info.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InformationComponent;
