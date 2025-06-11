import React, { createContext, useState, useContext, useEffect } from "react";

// Cria o Contexto de Autenticação
const AuthContext = createContext();

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provedor do Contexto
export const AuthProvider = ({ children }) => {
  // O estado 'user' pode ser um objeto com dados do usuário { name, email, ... } ou null
  const [user, setUser] = useState(null);

  // Simulação de verificação de sessão ao carregar a página
  useEffect(() => {
    // Em uma aplicação real, você verificaria um token (ex: JWT) no localStorage
    // Para simular, vamos verificar se há um 'user' mockado no localStorage
    const loggedInUser = localStorage.getItem("digitalStoreUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Função de Login (simulada)
  const login = (email, password) => {
    // --- LÓGICA DE LOGIN REAL IRIA AQUI ---
    // Em um projeto real, você faria uma chamada para sua API:
    // Ex: api.post('/login', { email, password }).then(response => { ... });

    // Por enquanto, vamos apenas simular um login bem-sucedido com dados mockados.
    // Não estamos validando a senha para este exemplo.
    const mockUser = { name: "Wellinson", email: email };

    localStorage.setItem("digitalStoreUser", JSON.stringify(mockUser));
    setUser(mockUser);

    // Em uma aplicação real, você retornaria a resposta da API (sucesso ou erro)
    return true;
  };

  // Função de Cadastro (simulada)
  const register = (name, email, password) => {
    // --- LÓGICA DE CADASTRO REAL IRIA AQUI ---
    // Ex: api.post('/register', { name, email, password }).then(...)

    // Apenas simula o cadastro e faz o login em seguida.
    console.log(`Usuário ${name} cadastrado com email ${email}`);
    const mockUser = { name: name, email: email };

    localStorage.setItem("digitalStoreUser", JSON.stringify(mockUser));
    setUser(mockUser);

    return true;
  };

  // Função de Logout
  const logout = () => {
    localStorage.removeItem("digitalStoreUser");
    setUser(null);
  };

  const isAuthenticated = !!user; // Converte o objeto user em um booleano (true se user não for null)

  // O valor que será fornecido para os componentes filhos
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
