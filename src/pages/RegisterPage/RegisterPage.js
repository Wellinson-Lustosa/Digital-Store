import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Section from '../../components/Section/Section';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (!firstName || !lastName || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // A função register no nosso contexto é simulada.
    try {
      const userData = { firstName, lastName, email, password };
      const registerSuccess = await register(userData);

      if (registerSuccess) {
        alert('Cadastro realizado com sucesso! Por favor, faça o login.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Section noBorderTop>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Criar Conta</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.formLabel}>Nome:</label>
              <input
                type="text"
                id="firstName"
                className={styles.formInput}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Seu nome"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.formLabel}>Sobrenome:</label>
              <input
                type="text"
                id="lastName"
                className={styles.formInput}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Seu sobrenome"
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