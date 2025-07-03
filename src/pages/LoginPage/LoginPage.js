import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Section from '../../components/Section/Section';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState(''); // Mudado de 'email' para 'username'
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      // Redireciona para a página anterior ou para a home após login
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(username, password);
      // Se o login for bem-sucedido, o useEffect cuidará do redirecionamento
    } catch (err) {
      setError(err.message); // Exibe o erro vindo do AuthContext/API
    }
  };

  // Para testar, use um usuário da DummyJSON, ex: kminchelle / 0lelplR

  return (
    <div className={styles.pageContainer}>
      <Section noBorderTop>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Acessar Conta</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              {/* Label e input atualizados para Nome de Usuário */}
              <label htmlFor="username" className={styles.formLabel}>Nome de Usuário:</label>
              <input
                type="text"
                id="username"
                className={styles.formInput}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ex: kminchelle"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Senha:</label>
              <input
                type="password"
                id="password"
                className={styles.formInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ex: 0lelplR"
                required
              />
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <button type="submit" className={styles.formButton}>
              Entrar
            </button>
          </form>
          <p className={styles.redirectLink}>
            Não tem uma conta?{' '}
            <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </Section>
    </div>
  );
};

export default LoginPage;