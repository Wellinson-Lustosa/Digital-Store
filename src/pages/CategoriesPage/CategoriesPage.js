import React from "react";
import { Link } from "react-router-dom";
import Section from "../../components/Section/Section";
import styles from "./CategoriesPage.module.css";

const mockCategories = [
  { name: "Camisas", slug: "camisas" },
  { name: "Calças", slug: "calcas" },
  { name: "Blazers", slug: "blazers" },
  { name: "Acessórios", slug: "acessorios" },
  { name: "Sapatos", slug: "sapatos" },
  { name: "Vestuário Esportivo", slug: "esportivo" },
];

const CategoriesPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Section title="Nossas Categorias" noBorderTop>
        <p style={{ textAlign: "center", marginBottom: "30px" }}>
          Explore nossa variedade de produtos navegando pelas categorias abaixo.
        </p>
        <ul className={styles.categoryList}>
          {mockCategories.map((category) => (
            <li key={category.slug} className={styles.categoryItem}>
              <Link to={`/products?category=${category.slug}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

export default CategoriesPage;
