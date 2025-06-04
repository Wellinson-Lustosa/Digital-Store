import React from "react";
// 1. Importe o arquivo de Módulo CSS
import styles from "./FilterGroup.module.css";

// Funções auxiliares para gerar IDs/nomes mais seguros (mantidas)
const titleToId = (title = "") =>
  title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
const valueToId = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const FilterGroup = ({
  title,
  inputType = "checkbox", // "checkbox" ou "radio"
  options = [], // Array de { text: "Label", value?: "val" }
  selectedValues, // Para radio: string | null; para checkbox: string[] ou { [value: string]: boolean }
  onFilterChange, // (value: string, isChecked?: boolean) => void
  name, // Necessário para agrupar radio buttons. Pode ser derivado do title se não fornecido.
}) => {
  const handleInputChange = (optionValue, event) => {
    if (onFilterChange) {
      if (inputType === "radio") {
        onFilterChange(optionValue); // Para radio, passa o novo valor selecionado
      } else {
        // checkbox
        onFilterChange(optionValue, event.target.checked); // Para checkbox, passa o valor e o estado de marcação
      }
    }
  };

  const isOptionSelected = (optionValue) => {
    if (inputType === "radio") {
      return selectedValues === optionValue;
    } else if (inputType === "checkbox") {
      if (Array.isArray(selectedValues)) {
        return selectedValues.includes(optionValue);
      } else if (typeof selectedValues === "object" && selectedValues !== null) {
        return !!selectedValues[optionValue]; // Verifica se a chave existe e é true
      }
      return false;
    }
    return false;
  };

  const groupName = name || (inputType === "radio" ? titleToId(title) : undefined);

  return (
    // 2. Use as classes do objeto 'styles'
    <div className={styles.filterGroupContainer}>
      {title && <h4 className={styles.filterGroupTitle}>{title}</h4>}

      {options && options.length > 0 ? (
        <div
          className={styles.filterOptionsList}
          role={inputType === "radio" ? "radiogroup" : "group"}
          aria-label={title}
        >
          {options.map((option, index) => {
            const value = option.value !== undefined ? option.value : option.text;
            const uniqueId = `${groupName || "filter"}-${valueToId(value)}-${index}`; // Gera um ID único

            return (
              <label
                key={uniqueId}
                htmlFor={uniqueId}
                className={styles.filterLabel}
              >
                <input
                  type={inputType}
                  id={uniqueId}
                  name={groupName}
                  value={value}
                  className={styles.filterInput}
                  checked={isOptionSelected(value)}
                  onChange={(e) => handleInputChange(value, e)}
                />
                {option.text}
              </label>
            );
          })}
        </div>
      ) : (
        <p className={styles.noOptionsText}>Nenhuma opção de filtro disponível.</p>
      )}
    </div>
  );
};

export default FilterGroup;
