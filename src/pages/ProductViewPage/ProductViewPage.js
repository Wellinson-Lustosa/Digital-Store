import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import Section from "../../components/Section/Section";
import ProductListing from "../../components/ProductListing/ProductListing";
import styles from "./ProductViewPage.module.css";
import { getProductById, getProducts } from "../../services/apis";

const ProductViewPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const productData = await getProductById(productId);
        setProduct(productData);

        const allProductsData = await getProducts();
        const allProducts = allProductsData.products || allProductsData;
        const recommended = allProducts
          .filter((p) => p.id !== productId)
          .slice(0, 4);
        setRelatedProducts(recommended);
      } catch (err) {
        setError(
          "Não foi possível carregar o produto. Verifique a URL ou tente novamente."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleOptionSelection = (selectedOptions) => {
    // Lógica futura
  };

  let content;
  if (isLoading) {
    content = <p className={styles.statusMessage}>Carregando produto...</p>;
  } else if (error) {
    content = (
      <p className={`${styles.statusMessage} ${styles.errorMessage}`}>
        {error}
      </p>
    );
  } else if (product) {
    content = (
      <ProductDetails
        product={product}
        onOptionChange={handleOptionSelection}
      />
    );
  } else {
    content = (
      <p className={`${styles.statusMessage} ${styles.errorMessage}`}>
        Produto não encontrado.
      </p>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Section noBorderTop>{content}</Section>
      {!isLoading && product && relatedProducts.length > 0 && (
        <Section
          title="Produtos recomendados"
          titleAlign="left"
          link={{ text: "Ver todos", href: "/produtos" }}
          className={styles.relatedProductsSection}
        >
          <ProductListing products={relatedProducts} />
        </Section>
      )}
    </div>
  );
};

export default ProductViewPage;
