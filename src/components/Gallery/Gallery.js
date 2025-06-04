// src/components/Gallery/Gallery.js
import React, { useState, useEffect } from "react";
import styles from "./Gallery.module.css";

// Importe os SVGs das setas (ajuste o caminho se os assets não estiverem na raiz de src/assets/icons)
// Certifique-se de que esses arquivos SVG existem na pasta 'src/assets/icons/'
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow-right.svg";

const Gallery = ({
  images = [],
  width = "100%", // Default se não especificado
  height = "400px", // Default se não especificado
  radius = "0px", // Default se não especificado
  showThumbs = false,
  className = "", // Para classes CSS externas
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lidar com o caso de não haver imagens
  if (!images || images.length === 0) {
    return (
      <div
        style={{
          width,
          height,
          borderRadius: radius,
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Nenhuma imagem disponível.
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const containerStyle = {
    width,
    height,
    borderRadius: radius,
  };

  const slideTrackStyle = {
    transform: `translateX(-${currentIndex * 100}%)`,
    height: "100%", // Garante que o track ocupe a altura do viewport
  };

  const slideImageStyle = {
    borderRadius: radius, // Aplica o radius à imagem principal
  };

  const thumbnailStyle = {
    borderRadius: radius, // Aplica o radius às miniaturas
  };

  return (
    <div
      className={`${styles.galleryContainer} ${className}`}
      style={containerStyle}
    >
      <div className={styles.slideViewport}>
        <div className={styles.slideTrack} style={slideTrackStyle}>
          {images.map((image, index) => (
            <div className={styles.slide} key={index}>
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className={styles.slideImage}
                style={slideImageStyle}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Setas de Navegação */}
      <button
        type="button"
        className={`${styles.arrow} ${styles.leftArrow} ${
          currentIndex === 0 ? styles.arrowDisabled : ""
        }`}
        onClick={goToPrevious}
        disabled={currentIndex === 0 && images.length > 1} // Desabilitar se só tiver 1 imagem não faz sentido, só no primeiro
        aria-label="Slide anterior"
      >
        <ArrowLeftIcon />
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.rightArrow} ${
          currentIndex === images.length - 1 ? styles.arrowDisabled : ""
        }`}
        onClick={goToNext}
        disabled={currentIndex === images.length - 1 && images.length > 1} // Desabilitar se só tiver 1 imagem não faz sentido, só no último
        aria-label="Próximo slide"
      >
        <ArrowRightIcon />
      </button>

      {/* Miniaturas (Thumbnails) */}
      {showThumbs &&
        images.length > 1 && ( // Só mostra thumbs se houver mais de uma imagem
          <div className={styles.thumbnailStrip}>
            {images.map((image, index) => (
              <img
                key={`thumb-${index}`}
                src={image.src}
                alt={`Miniatura ${index + 1}`}
                className={`${styles.thumbnail} ${
                  index === currentIndex ? styles.thumbnailSelected : ""
                }`}
                style={thumbnailStyle}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default Gallery;
