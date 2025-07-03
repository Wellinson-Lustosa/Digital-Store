import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Cria o Contexto
const CartContext = createContext();

// 2. Cria um Hook customizado para facilitar o uso do contexto
export const useCart = () => useContext(CartContext);

// 3. Cria o Provedor do Contexto (CartProvider)
export const CartProvider = ({ children }) => {
  // Estado para os itens do carrinho. Ex: [{ id, name, price, quantity, image, selectedOptions: { Tamanho: 'M', Cor: '#000' } }, ...]
  const [cartItems, setCartItems] = useState(() => {
    // Tenta carregar o carrinho do localStorage ao iniciar
    try {
      const localData = localStorage.getItem('digitalStoreCart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Erro ao carregar carrinho do localStorage:', error);
      return [];
    }
  });

  // Salva o carrinho no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('digitalStoreCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Função para adicionar item ao carrinho
  const addToCart = (product, quantity = 1, selectedOptions = {}) => {
    setCartItems((prevItems) => {
      // Identificador único para a variação do produto (produtoId + opções)
      // Se não houver opções, podemos usar apenas o product.id ou um identificador padrão.
      const variantId = `${product.id}-${Object.values(selectedOptions).sort().join('-')}`;
      const existingItemIndex = prevItems.findIndex(
        (item) => item.variantId === variantId
      );

      if (existingItemIndex > -1) {
        // Se o item (com as mesmas opções) já existe, atualiza a quantidade
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Adiciona novo item ao carrinho
        return [
          ...prevItems,
          { ...product, quantity, selectedOptions, variantId },
        ];
      }
    });
  };

  // Função para remover item do carrinho (pelo variantId)
  const removeFromCart = (variantIdToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.variantId !== variantIdToRemove)
    );
  };

  // Função para atualizar a quantidade de um item
  const updateQuantity = (variantIdToUpdate, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(variantIdToUpdate); // Remove se a quantidade for 0 ou menor
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.variantId === variantIdToUpdate
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcula o número total de itens diferentes no carrinho (ou a soma das quantidades)
  // Para o ícone, geralmente é o número de itens únicos ou a soma das quantidades.
  // O README seção 3.1.4 menciona um ícone, mas não se ele mostra contagem.
  // Vamos fazer a contagem total de unidades.
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  
  // Calcula o valor total do carrinho
  const cartTotal = cartItems.reduce((total, item) => {
    const priceToUse = item.priceDiscount ?? item.price; // Usa preço com desconto se disponível
    return total + priceToUse * item.quantity;
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};