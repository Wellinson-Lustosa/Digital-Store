import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import ProductListingPage from "./pages/ProductListingPage/ProductListingPage";
import ProductViewPage from "./pages/ProductViewPage/ProductViewPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import SecurityPage from "./pages/SecurityPage/SecurityPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import CareersPage from "./pages/CareersPage/CareersPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage/PaymentMethodsPage";
import FaqPage from "./pages/FaqPage/FaqPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage/TermsOfServicePage";
import CartPage from "./pages/CartPage/CartPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // 1. Importe o ProtectedRoute

// Placeholder para páginas ainda não completamente desenvolvidas (ex: Login, Cadastro)
const PlaceholderPage = ({ title }) => (
  <div
    style={{
      padding: "40px 20px",
      textAlign: "center",
      minHeight: "300px",
    }}
  >
    <h2 style={{ fontSize: "2em", marginBottom: "20px" }}>{title}</h2>
    <p>Conteúdo desta página estará disponível em breve.</p>
  </div>
);

function App() {
  return (
    <Layout>
      <Routes>
        {/* Rotas principais conforme README */}
        <Route path="/" element={<HomePage />} />
        <Route path="/produtos" element={<ProductListingPage />} />
        <Route path="/product/:productId" element={<ProductViewPage />} />
        {/* Rotas para links do Header e Footer */}
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* --- Rotas Protegidas --- */}
        {/* Envolvemos o elemento da rota com o nosso componente ProtectedRoute */}
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />

        {/* ... (outras rotas públicas como /about, /faq, etc.) ... */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/payment-methods" element={<PaymentMethodsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />

        {/* Rotas de Login e Cadastro (não precisam de proteção) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rota 404 */}
        <Route path="*" element={<PlaceholderPage title="404 - Página Não Encontrada" />} />
      </Routes>
    </Layout>
  );
}

export default App;
