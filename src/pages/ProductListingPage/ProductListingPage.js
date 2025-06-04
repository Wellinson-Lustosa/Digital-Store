import React, { useState } from "react";
// import { useLocation } from 'react-router-dom';
import ProductListing from "../../components/ProductListing/ProductListing";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import Section from "../../components/Section/Section";
import styles from "./ProductListingPage.module.css";

// Importe as imagens de produto para o mock (de src/assets/products/)
import productThumb1 from "../../assets/products/product-thumb-1.jpeg";
import productThumb2 from "../../assets/products/product-thumb-2.jpeg";
import productThumb3 from "../../assets/products/product-thumb-3.jpeg";
import productThumb4 from "../../assets/products/product-thumb-4.jpeg";
import productThumb5 from "../../assets/products/product-thumb-5.jpeg";
// ... importe mais se precisar para um mock maior

// Mock de filtros (Seção 6.2 do README)
const categoryFilterOptions = {
  title: "Categoria",
  inputType: "checkbox",
  name: "category-filter",
  options: [
    { text: "Camisetas", value: "camisetas" },
    { text: "Calças", value: "calcas" },
    { text: "Sapatos", value: "sapatos" },
    { text: "Acessórios", value: "acessorios" },
  ],
};

const brandFilterOptions = {
  title: "Marca",
  inputType: "radio",
  name: "brand-filter",
  options: [
    { text: "Digital Store Brand", value: "ds-brand" },
    { text: "Outra Marca Legal", value: "cool-brand" },
    { text: "Marca XYZ", value: "xyz" },
  ],
};

// Mock de produtos (Seção 6.3 do README)
const allProductsMock = [
  {
    id: "plp1",
    name: "Camisa Minimalista Branca",
    image: productThumb1,
    price: 180,
    priceDiscount: 129.9,
  },
  { id: "plp2", name: "Calça Chino Bege", image: productThumb2, price: 220 },
  {
    id: "plp3",
    name: "Sapato Oxford Preto",
    image: productThumb3,
    price: 350,
    priceDiscount: 299.5,
  },
  { id: "plp4", name: "Cinto Couro Marrom", image: productThumb4, price: 95 },
  { id: "plp5", name: "Camisa Polo Azul", image: productThumb5, price: 150 },
  // Adicione mais produtos para ter uma lista maior
];

const ProductListingPage = () => {
  const [productsToDisplay, setProductsToDisplay] = useState(allProductsMock);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // const location = useLocation();
  // useEffect(() => {
  //   // Lógica de filtragem e ordenação real seria implementada aqui,
  //   // atualizando productsToDisplay com base em sortOrder, selectedCategories, selectedBrand
  //   // e query params de location.search (ex: ?filter=termoDaBuscaDoHeader)
  //   let filtered = allProductsMock;
  //   // if (selectedCategories.length > 0) { /* filtrar por categoria */ }
  //   // if (selectedBrand) { /* filtrar por marca */ }
  //   // if (sortOrder === 'price_asc') { /* ordenar */ }
  //   // setProductsToDisplay(filtered);
  //   console.log("Filtros ou ordenação alterados:", { sortOrder, selectedCategories, selectedBrand });
  // }, [sortOrder, selectedCategories, selectedBrand/*, location.search */]);

  const productCount = productsToDisplay.length;
  const resultsTitle =
    productCount > 0
      ? `${productCount} Produtos Encontrados`
      : "Nenhum produto encontrado com os filtros atuais";

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.filtersAside}>
        {/* 6.1 - Ordenar por */}
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
          </select>
        </div>

        {/* 6.2 - Filtrar por */}
        <div className={styles.filterSectionContainer}>
          <h3 className={styles.filterSectionOverallTitle}>Filtrar por</h3>
          <hr className={styles.filterDivider} />

          <FilterGroup
            {...categoryFilterOptions}
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
            {...brandFilterOptions}
            selectedValues={selectedBrand}
            onFilterChange={(value) => setSelectedBrand(value)}
          />
        </div>
      </aside>

      <main className={styles.mainContent}>
        <Section title={resultsTitle} titleAlign="left" noBorderTop>
          <ProductListing products={productsToDisplay} />
        </Section>
      </main>
    </div>
  );
};

export default ProductListingPage;
