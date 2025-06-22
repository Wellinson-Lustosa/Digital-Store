const API_BASE_URL = 'http://localhost:3001';

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  const data = await response.json();
  // json-server retorna { products: [...] }
  return data.products || data;
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar produto');
  return await response.json();
};
