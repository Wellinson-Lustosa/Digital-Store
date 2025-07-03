const API_BASE_URL = 'https://dummyjson.com';

// Função para fazer login de usuário na API real
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        // expiresInMins: 60, // Opcional
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao fazer login');
    }

    return data; // Retorna o objeto do usuário com o token
  } catch (error) {
    console.error("Falha na API de login:", error);
    throw error;
  }
};

// Função para cadastrar um novo usuário na API real
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro ao cadastrar usuário');
    }
    
    return data; // Retorna o novo usuário criado (sem a senha)
  } catch (error) {
    console.error("Falha na API de cadastro:", error);
    throw error;
  }
};

// Função para obter dados do usuário com um token
export const getMyData = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Sessão inválida');
    }
    return data;
  } catch (error) {
    console.error("Falha ao obter dados do usuário:", error);
    throw error;
  }
}

// Exemplo para produtos usando dummyjson.com
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao buscar produtos');
    }
    return data.products || [];
  } catch (error) {
    console.error("Falha ao buscar produtos:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao buscar produto');
    }
    return data;
  } catch (error) {
    console.error("Falha ao buscar produto:", error);
    throw error;
  }
};
