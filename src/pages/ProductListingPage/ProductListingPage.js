import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';
import ProductListing from "../../components/ProductListing/ProductListing";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import Section from "../../components/Section/Section";
import styles from "./ProductListingPage.module.css";
// import { ReactComponent as FilterIcon } from '../../assets/icons/filter-icon.svg';

// Importe as imagens de produto para o mock
import productThumb1 from "../../assets/products/product-thumb-1.jpeg";
import productThumb2 from "../../assets/products/product-thumb-2.jpeg";
import productThumb3 from "../../assets/products/product-thumb-3.jpeg";
import productThumb4 from "../../assets/products/product-thumb-4.jpeg";
import productThumb5 from "../../assets/products/product-thumb-5.jpeg";

// Mock de dados completo para produtos
const allProductsMock = [
  {
    id: "plp1",
    name: "Camisa Minimalista Branca",
    image: productThumb1,
    price: 180,
    priceDiscount: 129.9,
    category: "camisetas",
    brand: "ds-brand",
    color: "branco",
  },
  {
    id: "plp2",
    name: "Calça Chino Bege",
    image: productThumb2,
    price: 220,
    category: "calcas",
    brand: "cool-brand",
    color: "bege",
  },
  {
    id: "plp3",
    name: "Sapato Oxford Preto",
    image: productThumb3,
    price: 350,
    priceDiscount: 299.5,
    category: "sapatos",
    brand: "xyz",
    color: "preto",
  },
  {
    id: "plp4",
    name: "Cinto Couro Marrom",
    image: productThumb4,
    price: 95,
    category: "acessorios",
    brand: "ds-brand",
    color: "marrom",
  },
  {
    id: "plp5",
    name: "Camisa Polo Azul Royal",
    image: productThumb5,
    price: 150,
    category: "camisetas",
    brand: "cool-brand",
    color: "azul",
  },
  {
    id: "plp6",
    name: "Blazer Preto Elegante",
    image: productThumb1,
    price: 450,
    category: "blazers",
    brand: "xyz",
    color: "preto",
  },
  {
    id: "plp7",
    name: "Calça Jeans Escura",
    image: productThumb2,
    price: 190,
    category: "calcas",
    brand: "ds-brand",
    color: "preto",
  },
  {
    id: "plp8",
    name: "Tênis Casual Branco",
    image: productThumb3,
    price: 280,
    category: "sapatos",
    brand: "cool-brand",
    color: "branco",
  },
];

// Mock de filtros
const categoryFilterOptions = {
  title: "Categorias",
  inputType: "checkbox",
  name: "category-filter",
  options: [
    { text: "Camisetas", value: "camisetas" },
    { text: "Calças", value: "calcas" },
    { text: "Sapatos", value: "sapatos" },
    { text: "Acessórios", value: "acessorios" },
    { text: "Blazers", value: "blazers" },
  ],
};

const brandFilterOptions = {
  title: "Marca",
  inputType: "radio",
  name: "brand-filter",
  options: [
    { text: "Todas as Marcas", value: "" },
    { text: "Digital Store Brand", value: "ds-brand" },
    { text: "Outra Marca Legal", value: "cool-brand" },
    { text: "Marca XYZ", value: "xyz" },
  ],
};

const colorFilterOptions = {
  title: "Cor",
  inputType: "checkbox",
  name: "color-filter",
  options: [
    { text: "Branco", value: "branco" },
    { text: "Preto", value: "preto" },
    { text: "Azul", value: "azul" },
    { text: "Bege", value: "bege" },
    { text: "Marrom", value: "marrom" },
  ],
};

const ProductListingPage = () => {
  const [productsToDisplay, setProductsToDisplay] = useState(allProductsMock);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    let processedProducts = [...allProductsMock];

    // Filtro de Categoria
    if (selectedCategories.length > 0) {
      processedProducts = processedProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filtro de Marca
    if (selectedBrand && selectedBrand !== "") {
      processedProducts = processedProducts.filter(
        (product) => product.brand === selectedBrand
      );
    }

    // Filtro de Cor
    if (selectedColors.length > 0) {
      processedProducts = processedProducts.filter((product) =>
        selectedColors.includes(product.color)
      );
    }

    // Ordenação
    switch (sortOrder) {
      case "price_asc":
        processedProducts.sort(
          (a, b) =>
            (a.priceDiscount ?? a.price) - (b.priceDiscount ?? b.price)
        );
        break;
      case "price_desc":
        processedProducts.sort(
          (a, b) =>
            (b.priceDiscount ?? b.price) - (a.priceDiscount ?? a.price)
        );
        break;
      case "name_asc":
        processedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        processedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
      // Mantém a ordem original
    }

    setProductsToDisplay(processedProducts);
  }, [sortOrder, selectedCategories, selectedBrand, selectedColors]);

  // Bloqueia o scroll do body quando o painel de filtros está aberto no mobile
  useEffect(() => {
    if (isFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFiltersOpen]);

  const productCount = productsToDisplay.length;
  const resultsTitle =
    productCount > 0
      ? `${productCount} Produto${productCount > 1 ? "s" : ""} Encontrado${
          productCount > 1 ? "s" : ""
        }`
      : "Nenhum produto encontrado com os filtros atuais";

  return (
    <div className={styles.pageContainer}>
      {/* Overlay para fechar o painel de filtros no mobile */}
      <div
        className={`${styles.filterOverlay} ${
          isFiltersOpen ? styles.isOpen : ""
        }`}
        onClick={() => setIsFiltersOpen(false)}
      />

      {/* Painel de filtros lateral (sidebar ou drawer mobile) */}
      <aside
        className={`${styles.filtersAside} ${
          isFiltersOpen ? styles.isOpen : ""
        }`}
      >
        <button
          onClick={() => setIsFiltersOpen(false)}
          className={styles.closeFiltersButton}
          aria-label="Fechar filtros"
        >
          &times;
        </button>

        {/* Ordenar por */}
        <div className={styles.sortSectionContainer}>
          <label htmlFor="sort-order-select" className={styles.sortLabel}>
            Ordenar por:
          </label>
          <select
            id="sort-order-select"
            className={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="relevance">Relevância</option>
            <option value="price_asc">Menor preço</option>
            <option value="price_desc">Maior preço</option>
            <option value="name_asc">Nome (A-Z)</option>
            <option value="name_desc">Nome (Z-A)</option>
          </select>
        </div>

        {/* Filtrar por */}
        <div className={styles.filterSectionContainer}>
          <h3 className={styles.filterSectionOverallTitle}>Filtrar por</h3>
          <hr className={styles.filterDivider} />

          <FilterGroup
            title={categoryFilterOptions.title}
            inputType={categoryFilterOptions.inputType}
            name={categoryFilterOptions.name}
            options={categoryFilterOptions.options}
            selectedValues={selectedCategories}
            onFilterChange={(value, isChecked) => {
              setSelectedCategories((prev) =>
                isChecked
                  ? [...prev, value]
                  : prev.filter((item) => item !== value)
              );
            }}
          />
          <FilterGroup
            title={brandFilterOptions.title}
            inputType={brandFilterOptions.inputType}
            name={brandFilterOptions.name}
            options={brandFilterOptions.options}
            selectedValues={selectedBrand}
            onFilterChange={(value) => setSelectedBrand(value)}
          />
          <FilterGroup
            title={colorFilterOptions.title}
            inputType={colorFilterOptions.inputType}
            name={colorFilterOptions.name}
            options={colorFilterOptions.options}
            selectedValues={selectedColors}
            onFilterChange={(value, isChecked) => {
              setSelectedColors((prev) =>
                isChecked
                  ? [...prev, value]
                  : prev.filter((item) => item !== value)
              );
            }}
          />
        </div>
      </aside>

      <main className={styles.mainContent}>
        {/* Botão para abrir filtros no mobile */}
        <button
          className={styles.mobileFilterButton}
          onClick={() => setIsFiltersOpen(true)}
        >
          {/* <FilterIcon /> */}
          <span>Filtrar e Ordenar</span>
        </button>
        <Section title={resultsTitle} titleAlign="left" noBorderTop>
          <ProductListing products={productsToDisplay} />
        </Section>
      </main>
    </div>
  );
};

export default ProductListingPage;
