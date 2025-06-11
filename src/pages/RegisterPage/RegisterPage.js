import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Section from '../../components/Section/Section';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redireciona se o usuário já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redireciona para a home se já estiver autenticado
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    // Validações básicas
    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // A função register no nosso contexto é simulada.
    try {
      const registerSuccess = await register(name, email, password);
      if (!registerSuccess) {
        setError('Não foi possível realizar o cadastro. Tente outro e-mail.');
      }
      // O useEffect acima cuidará do redirecionamento após o estado de autenticação mudar.
    } catch (err) {
      setError('Ocorreu um erro ao tentar realizar o cadastro. Tente novamente.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Section noBorderTop>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Criar Conta</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Nome Completo:</label>
              <input
                type="text"
                id="name"
                className={styles.formInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                required
              />
            </div>
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
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.formLabel}>Confirme sua Senha:</label>
              <input
                type="password"
                id="confirmPassword"
                className={styles.formInput}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a senha"
                required
              />
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <button type="submit" className={styles.formButton}>
              Cadastrar
            </button>
          </form>
          <p className={styles.redirectLink}>
            Já tem uma conta?{' '}
            <Link to="/login">Entre</Link>
          </p>
        </div>
      </Section>
    </div>
  );
};

export default RegisterPage;