import React from "react";
import ProductCard from "../ProductCard/ProductCard"; // Este componente já está refatorado

// 1. Importe o CSS Module
import styles from "./ProductListing.module.css";

// Mock de dados para demonstração (pode vir de props ou de um estado/contexto)
const mockProducts = [
  {
    id: "1",
    name: "Produto Exemplo Alfa Moderno com Nome Muito Longo para Testar Quebra de Linha",
    price: 99.9,
    imageUrl: "https://via.placeholder.com/300x200.png?text=Produto+A",
  },
  {
    id: "2",
    name: "Produto Beta Clássico",
    price: 129.9,
    imageUrl: "https://via.placeholder.com/300x200.png?text=Produto+B",
  },
  {
    id: "3",
    name: "Produto Gama Compacto",
    price: 79.9,
    imageUrl: "https://via.placeholder.com/300x200.png?text=Produto+G",
  },
  {
    id: "4",
    name: "Produto Delta Inovador",
    price: 199.5,
    imageUrl: "https://via.placeholder.com/300x200.png?text=Produto+D",
  },
];

const ProductListing = ({ products }) => {
  // Usa os produtos passados por prop, ou o mock como fallback
  const productsToDisplay =
    products && products.length > 0 ? products : mockProducts;
  // Se nem products nem mockProducts (ou se products for explicitamente [])
  const showNoProductsMessage =
    !productsToDisplay || productsToDisplay.length === 0;

  return (
    // 2. Aplique as classes do objeto 'styles'
    <div className={styles.listingContainer}>
      {showNoProductsMessage ? (
        <p className={styles.noProductsMessage}>Nenhum produto encontrado.</p>
      ) : (
        productsToDisplay.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductListing;
