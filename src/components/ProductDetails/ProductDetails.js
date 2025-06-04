import React, { useState, useEffect } from "react"; // Adicionado useState e useEffect para gerenciar selectedSize/Color
import BuyBox from "../BuyBox/BuyBox";
import Gallery from "../Gallery/Gallery"; // Importe o componente Gallery
import ProductOptions from "../ProductOptions/ProductOptions";
import styles from "./ProductDetails.module.css";

const ProductDetails = ({ product, onOptionChange }) => {
  // Estados para as opções selecionadas, inicializados a partir do produto
  const [selectedSize, setSelectedSize] = useState(
    () =>
      product && product.sizes && product.sizes.length > 0
        ? product.sizes[0]
        : null
  );
  const [selectedColor, setSelectedColor] = useState(
    () =>
      product && product.colors && product.colors.length > 0
        ? product.colors[0]
        : null
  );

  // Atualiza seleções se o produto mudar
  useEffect(() => {
    if (product) {
      setSelectedSize(
        product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
      );
      setSelectedColor(
        product.colors && product.colors.length > 0 ? product.colors[0] : null
      );
    }
  }, [product]);

  // Atualiza o estado combinado e notifica o pai
  const handleCombinedOptionChange = (newSelectionPart) => {
    const currentSelection = {
      ...(product.sizes && { Tamanho: selectedSize }),
      ...(product.colors && { Cor: selectedColor }),
    };
    const updatedFullSelection = { ...currentSelection, ...newSelectionPart };

    if (onOptionChange) {
      onOptionChange(updatedFullSelection);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    handleCombinedOptionChange({ Tamanho: size });
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    handleCombinedOptionChange({ Cor: color });
  };

  if (!product) {
    // O estado de carregamento/não encontrado é melhor tratado pela página pai.
    // Se chegar aqui sem produto, é um erro de lógica ou produto realmente nulo.
    return <p className={styles.loadingText}>Detalhes do produto indisponíveis.</p>;
  }

  const galleryImagesForProduct = product.galleryImages || []; // Garante que seja um array

  // Prepara as opções para o componente ProductOptions
  const sizeOptions = product.sizes || [];
  const colorOptions = product.colors || [];

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.imageGallery}>
        <Gallery
          images={galleryImagesForProduct}
          showThumbs
          width="700px"
          height="570px"
          radius="4px"
        />
      </div>

      <div className={styles.productInfo}>
        <BuyBox
          name={product.name}
          reference={product.sku} // Usando sku como reference (README BuyBox)
          stars={product.averageRating} // Ex: 4.7 (README BuyBox)
          rating={
            product.totalReviews
              ? `${product.totalReviews} avaliações`
              : "(0 avaliações)"
          } // Ex: (90 avaliações) (README BuyBox)
          price={product.price} // (README BuyBox)
          priceDiscount={product.priceDiscount} // (README BuyBox)
          description={product.description} // (README BuyBox)
          onBuy={() =>
            console.log(
              "Comprar:",
              product.name,
              "Tamanho:",
              selectedSize,
              "Cor:",
              selectedColor
            )
          }
        >
          {/* Renderizando ProductOptions para Tamanhos */}
          {sizeOptions.length > 0 && (
            <div className={styles.optionGroupWrapper}>
              <label
                id={`${product.id}-size-options-label`}
                className={styles.optionGroupTitle}
              >
                Tamanhos:
              </label>
              <ProductOptions
                optionGroupName={`${product.id}-size-options-label`}
                options={sizeOptions}
                shape="square" // Conforme sketch buybox.jpg e README seção 7.2
                type="text"
                radius="4px" // Conforme README seção 7.2
                selectedOption={selectedSize}
                onOptionSelect={handleSizeSelect}
              />
            </div>
          )}

          {/* Renderizando ProductOptions para Cores */}
          {colorOptions.length > 0 && (
            <div className={styles.optionGroupWrapper}>
              <label
                id={`${product.id}-color-options-label`}
                className={styles.optionGroupTitle}
              >
                Cores:
              </label>
              <ProductOptions
                optionGroupName={`${product.id}-color-options-label`}
                options={colorOptions}
                shape="circle" // Conforme sketch buybox.jpg e README seção 7.2
                type="color"
                // radius não é usado para shape="circle" com border-radius: 50%
                selectedOption={selectedColor}
                onOptionSelect={handleColorSelect}
              />
            </div>
          )}
        </BuyBox>
      </div>
    </div>
  );
};

export default ProductDetails;
