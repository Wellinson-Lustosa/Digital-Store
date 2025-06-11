import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Section from '../../components/Section/Section';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      // 1. Obtém a página de origem do estado da localização, ou a home como padrão
      const from = location.state?.from?.pathname || '/';
      // 2. Redireciona o usuário para a página de onde ele veio
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const loginSuccess = await login(email, password);
      if (!loginSuccess) {
        setError('Email ou senha inválidos.');
      }
      // O useEffect acima cuidará do redirecionamento
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Section noBorderTop>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Acessar Conta</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>E-mail:</label>
              <input
                type="email"
                id="email"
                className={styles.formInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
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
                placeholder="********"
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