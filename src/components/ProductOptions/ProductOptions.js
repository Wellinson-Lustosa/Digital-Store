import React, { useEffect } from "react";
// 1. Importe o CSS Module
import styles from "./ProductOptions.module.css";

const ProductOptions = ({
  options = [], // Array de strings: e.g., ["39", "40"] ou ["#000", "#FFF"]
  shape = "square", // "square" ou "circle"
  type = "text", // "text" ou "color"
  radius = "4px", // Usado se shape="square"
  selectedOption, // String: o valor da opção atualmente selecionada
  onOptionSelect, // Função callback: (selectedValue) => void
  optionGroupName, // Nome do grupo de opções, para acessibilidade
}) => {
  // Inicializa as opções selecionadas com o primeiro valor de cada grupo, se desejado
  useEffect(() => {
    if (options && options.length > 0) {
      const initialSelections = {};
      options.forEach((option) => {
        if (option.values && option.values.length > 0) {
          // Opcional: pode-se pré-selecionar o primeiro valor ou deixar sem seleção inicial
          // initialSelections[option.name] = option.values[0];
        }
      });
      if (onOptionSelect && Object.keys(initialSelections).length > 0) {
        // onOptionChange(initialSelections); // Descomente se quiser notificar a seleção inicial
      }
    }
  }, [options, onOptionSelect]); // Executa quando 'options' muda (raro, mas para robustez)

  if (!options || options.length === 0) {
    return <p className={styles.noOptionsText}>Nenhuma variação disponível.</p>;
  }

  return (
    // 2. Aplique as classes
    <div
      className={styles.optionsListContainer}
      role="radiogroup"
      aria-labelledby={optionGroupName ? optionGroupName : undefined}
    >
      {options.map((optionValue) => {
        const isSelected = selectedOption === optionValue;

        const optionItemClasses = [
          styles.optionItem,
          shape === "square" ? styles.squareShape : styles.circleShape,
          type === "text" ? styles.textType : styles.colorType,
          isSelected ? styles.optionSelected : "",
        ].join(" ");

        const inlineStyles = {};

        if (shape === "square") {
          inlineStyles.borderRadius = radius;
        }

        if (type === "color") {
          inlineStyles.backgroundColor = optionValue;
          if (
            optionValue.toLowerCase() === "#ffffff" ||
            optionValue.toLowerCase() === "white"
          ) {
            // A borda padrão já é cinza. Se selecionado, a borda primária será mais forte.
          }
        }

        return (
          <button
            key={optionValue}
            className={optionItemClasses}
            style={inlineStyles}
            onClick={() => onOptionSelect && onOptionSelect(optionValue)}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={
              type === "color" ? `Cor ${optionValue}` : `Opção ${optionValue}`
            }
            title={type === "color" ? `Cor ${optionValue}` : optionValue}
          >
            {type === "text" ? optionValue : null}
            {/* Para type="color", o conteúdo visual é o background. */}
          </button>
        );
      })}
    </div>
  );
};

export default ProductOptions;
