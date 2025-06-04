import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import Section from "../../components/Section/Section";
import ProductListing from "../../components/ProductListing/ProductListing";
import styles from "./ProductViewPage.module.css";

// --- IMPORTAÇÃO DAS IMAGENS DE PRODUTO DE SRC/ASSETS ---
// Estas são as imagens que serão usadas na galeria do produto
import productImage1 from "../../assets/products/product-image-1.jpeg";
import productImage2 from "../../assets/products/product-image-2.jpeg";
import productImage3 from "../../assets/products/product-image-3.jpeg";

// Mock de dados atualizado para incluir um array de imagens para a galeria
const mockProductData = {
  1: {
    id: "1",
    name: "Camisa Social Premium Branca",
    sku: "CSPB001", // Referência conforme README BuyBox
    averageRating: 4.7, // Para props.stars
    totalReviews: 90, // Para props.rating
    price: 219.0, // Preço original
    priceDiscount: 189.9, // Preço com desconto
    description:
      "Camisa elegante de algodão egípcio, perfeita para ocasiões formais e para o dia a dia no escritório. Toque macio e caimento impecável.",
    colors: ["#FFFFFF", "#ADD8E6", "#000000"], // Branco, Azul Claro (exemplo), Preto
    sizes: ["P", "M", "G", "GG"],
    // Array de imagens para a galeria, conforme esperado pelo componente <Gallery />
    galleryImages: [
      { src: productImage1 },
      { src: productImage2 },
      { src: productImage3 },
    ],
  },
  2: {
    id: "2",
    name: "Calça Alfaiataria Cinza Escuro",
    sku: "CACE002",
    averageRating: 4.5,
    totalReviews: 75,
    price: 279.9,
    // Sem priceDiscount para este exemplo
    description:
      "Calça de corte moderno em tecido de lã fria, ideal para compor looks sofisticados. Possui bolsos faca e modelagem slim.",
    colors: ["#A9A9A9", "#000000"], // Cinza Escuro, Preto
    sizes: ["38", "40", "42", "44"],
    galleryImages: [
      { src: productImage2 }, // Imagem principal diferente
      { src: productImage1 },
      { src: productImage3 },
    ],
  },
  // Adicione mais produtos mockados para teste, se necessário
};

const mockRelatedProducts = [
  {
    id: "prodRec1",
    name: "Gravata de Seda Azul",
    image: productImage3,
    price: 89.9,
  },
  {
    id: "prodRec2",
    name: "Cinto de Couro Preto",
    image: productImage1,
    price: 119.9,
  },
  // ... mais produtos relacionados
];

const ProductViewPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simula busca de dados de uma API
    setTimeout(() => {
      const foundProduct = mockProductData[productId];
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setProduct(null);
        console.warn(
          `Produto com ID ${productId} não encontrado no mockProductData.`
        );
      }
      setIsLoading(false);
    }, 300); // Simula delay
  }, [productId]);

  const handleOptionSelection = (selectedOptions) => {
    console.log("Opções selecionadas (da ProductViewPage):", selectedOptions);
    // Lógica para atualizar SKU, imagem principal da galeria (se aplicável), preço, etc.
    // Por exemplo, se a cor mudar, e você tiver imagens específicas por cor:
    // if (selectedOptions.Cor && product && product.variants) {
    //   const variant = product.variants.find(v => v.colorHex === selectedOptions.Cor);
    //   if (variant && variant.mainImage) {
    //     // Atualizar a primeira imagem da galeria ou um estado de imagem principal
    //     // setProduct(prev => ({...prev, galleryImages: [{src: variant.mainImage}, ...outrasImagens]}));
    //   }
    // }
  };

  let content;
  if (isLoading) {
    content = <p className={styles.statusMessage}>Carregando produto...</p>;
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

      {!isLoading && product && (
        <Section
          title="Produtos recomendados"
          titleAlign="left"
          link={{ text: "Ver todos", href: "/products" }}
          className={styles.relatedProductsSection}
        >
          <ProductListing products={mockRelatedProducts} />
        </Section>
      )}
    </div>
  );
};

export default ProductViewPage;
