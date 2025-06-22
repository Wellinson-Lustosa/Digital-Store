import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductListing from "../../components/ProductListing/ProductListing";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import Section from "../../components/Section/Section";
import styles from "./ProductListingPage.module.css";
import { getProducts } from "../../services/apis";

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

const ProductListingPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const productsData = await getProducts();
        setAllProducts(productsData);
      } catch (err) {
        setError(
          "Não foi possível carregar os produtos. Tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let processedProducts = [...allProducts];
    const searchTermFromUrl = searchParams.get("filter");

    if (searchTermFromUrl) {
      processedProducts = processedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTermFromUrl.toLowerCase())
      );
    }
    if (selectedCategories.length > 0) {
      processedProducts = processedProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }
    if (selectedBrand && selectedBrand !== "") {
      processedProducts = processedProducts.filter(
        (product) => product.brand === selectedBrand
      );
    }
    switch (sortOrder) {
      case "price_asc":
        processedProducts.sort(
          (a, b) => (a.priceDiscount ?? a.price) - (b.priceDiscount ?? b.price)
        );
        break;
      case "price_desc":
        processedProducts.sort(
          (a, b) => (b.priceDiscount ?? b.price) - (a.priceDiscount ?? a.price)
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
  }, [searchParams, sortOrder, selectedCategories, selectedBrand, allProducts]);

  const productCount = productsToDisplay.length;
  const resultsTitle =
    productCount > 0
      ? `${productCount} Produto${productCount > 1 ? "s" : ""} Encontrado${
          productCount > 1 ? "s" : ""
        }`
      : "Nenhum produto encontrado com os filtros atuais";

  if (isLoading) {
    return (
      <Section title="Carregando Produtos..." noBorderTop>
        <p style={{ textAlign: "center" }}>Por favor, aguarde...</p>
      </Section>
    );
  }
  if (error) {
    return (
      <Section title="Ocorreu um Erro" noBorderTop>
        <p
          style={{
            textAlign: "center",
            color: "var(--error-color)",
          }}
        >
          {error}
        </p>
      </Section>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.filtersAside}>
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
