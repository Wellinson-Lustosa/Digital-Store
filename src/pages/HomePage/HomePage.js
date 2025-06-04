import React from "react";
import { Link } from "react-router-dom";
import Section from "../../components/Section/Section";
import ProductListing from "../../components/ProductListing/ProductListing";
import Gallery from "../../components/Gallery/Gallery";
import styles from "./HomePage.module.css";

// --- IMPORTAÇÃO DAS IMAGENS DE SRC/ASSETS ---
// Hero Slides (README seção 5.1)
import homeSlide1 from "../../assets/home/home-slide-1.jpeg";
import homeSlide2 from "../../assets/home/home-slide-2.jpeg";
import homeSlide3 from "../../assets/home/home-slide-3.jpeg";
import homeSlide4 from "../../assets/home/home-slide-4.jpeg";
import homeSlide5 from "../../assets/home/home-slide-5.jpeg";
import homeSlide6 from "../../assets/home/home-slide-6.jpeg";
import homeSlide7 from "../../assets/home/home-slide-7.jpeg";

// Collection Banners (README seção 5.2)
import collectionBanner1 from "../../assets/collections/collection-1.png";
import collectionBanner2 from "../../assets/collections/collection-2.png";
import collectionBanner3 from "../../assets/collections/collection-3.png";

// Product Thumbs (para Produtos em Alta, README seção 5.3)
import productThumb1 from "../../assets/products/product-thumb-1.jpeg";
import productThumb2 from "../../assets/products/product-thumb-2.jpeg";
import productThumb3 from "../../assets/products/product-thumb-3.jpeg";
import productThumb4 from "../../assets/products/product-thumb-4.jpeg";
import productThumb5 from "../../assets/products/product-thumb-5.jpeg";
import productThumb6 from "../../assets/products/product-image-1.jpeg";
import productThumb7 from "../../assets/products/product-image-2.jpeg";
import productThumb8 from "../../assets/products/product-image-3.jpeg";

// Dados para o <Gallery /> na HomePage
const homeGalleryImages = [
  { src: homeSlide1 },
  { src: homeSlide2 },
  { src: homeSlide3 },
  { src: homeSlide4 },
  { src: homeSlide5 },
  { src: homeSlide6 },
  { src: homeSlide7 },
];

// Dados para os destaques de coleção
const featuredCollections = [
  {
    id: "coll1",
    titleInternal: "Novo drop Supreme",
    image: collectionBanner1,
    link: "/products?collection=supreme",
  },
  {
    id: "coll2",
    titleInternal: "Coleção Adidas",
    image: collectionBanner2,
    link: "/products?collection=adidas",
  },
  {
    id: "coll3",
    titleInternal: "Novo Beats Bass",
    image: collectionBanner3,
    link: "/products?collection=beats",
  },
];

// Mock de 8 produtos para "Produtos em alta"
const trendingProducts = [
  {
    id: "trend1",
    name: "Produto em Alta 1",
    image: productThumb1,
    price: 200,
    priceDiscount: 149.9,
  },
  {
    id: "trend2",
    name: "Produto em Alta 2",
    image: productThumb2,
    price: 49.9,
  },
  {
    id: "trend3",
    name: "Produto em Alta 3",
    image: productThumb3,
    price: 150,
  },
  {
    id: "trend4",
    name: "Produto em Alta 4",
    image: productThumb4,
    price: 250,
    priceDiscount: 199.0,
  },
  {
    id: "trend5",
    name: "Produto em Alta 5",
    image: productThumb5,
    price: 80,
  },
  {
    id: "trend6",
    name: "Produto em Alta 6",
    image: productThumb6,
    price: 320,
  },
  {
    id: "trend7",
    name: "Produto em Alta 7",
    image: productThumb7,
    price: 170,
    priceDiscount: 150.5,
  },
  {
    id: "trend8",
    name: "Produto em Alta 8",
    image: productThumb8,
    price: 95,
  },
];

const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      {/* 5.1 - Slide de imagens (Hero Gallery) */}
      <div className={styles.heroGallerySection}>
        <Gallery images={homeGalleryImages} width="100%" height="681px" />
      </div>

      {/* 5.2 - Coleções em destaque */}
      <Section title="Coleções em destaque" titleAlign="center">
        <div className={styles.collectionsSectionContent}>
          {featuredCollections.map((collection) => (
            <Link
              to={collection.link}
              key={collection.id}
              className={styles.collectionItem}
            >
              <img
                src={collection.image}
                alt={collection.titleInternal}
                className={styles.collectionItemImage}
              />
            </Link>
          ))}
        </div>
      </Section>

      {/* 5.3 - Produtos em alta */}
      <Section title="Produtos em alta" titleAlign="left">
        <ProductListing products={trendingProducts} />
      </Section>
    </div>
  );
};

export default HomePage;
