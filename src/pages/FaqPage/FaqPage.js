// src/pages/AboutPage/AboutPage.js
import React from "react";
import Section from "../../components/Section/Section";
import styles from "./FaqPage.module.css"; // Crie este arquivo

const AboutPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Section title="Sobre Nós" noBorderTop>
        {" "}
        {/* Usando Section para o título */}
        <div className={styles.pageContent}>
          <p>
            Bem-vindo à Digital Store! Somos apaixonados por oferecer vestuário
            profissional da mais alta qualidade, combinando elegância, conforto
            e design moderno.
          </p>
          <p>
            Nossa missão é ajudar profissionais como você a se destacarem,
            transmitindo confiança e sofisticação através de suas roupas.
          </p>
          <p>
            Explore nossas coleções e descubra peças que elevam seu estilo
            profissional.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default AboutPage;
