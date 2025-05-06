import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login, loginWithGoogle } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

// Determinar la URL correcta basada en el entorno
const isProduction = window.location.hostname !== 'localhost';
const API_URL = isProduction 
  ? 'https://generadorcuentos.onrender.com'
  : 'http://localhost:5001';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setError('');
    setLoading(true);

    try {
      console.log('Calling login function...');
      const response = await login(formData.email, formData.password);
      console.log('Login response received:', response);

      if (response && response.token) {
        console.log('Token received, checking localStorage...');
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        console.log('Token in localStorage:', token ? 'Exists' : 'Not found');
        console.log('User in localStorage:', user ? 'Exists' : 'Not found');

        console.log('Refreshing user context...');
        await refreshUser();
        console.log('Navigation to home...');
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      const frontendUrl = window.location.origin;
      
      setTimeout(() => {
        window.location.href = `${API_URL}/api/auth/google?redirect_uri=${encodeURIComponent(frontendUrl)}`;
      }, 300);
      
    } catch (error) {
      console.error('Google login error:', error);
      setLoading(false);
      setError(t('login.error'));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">{t('login.title')}</h1>
        <p className="login-subtitle">{t('login.subtitle')}</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button 
          onClick={handleGoogleLogin}
          className="google-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="spinner small-spinner"></div>
              {t('login.loading')}
            </>
          ) : (
            <>
              <img src="/google-icon.svg" alt="Google" />
              {t('login.signInWithGoogle')}
            </>
          )}
        </button>

        <div className="divider">
          <span>{t('login.or')}</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">{t('login.emailLabel')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('login.emailPlaceholder')}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('login.passwordLabel')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('login.passwordPlaceholder')}
              required
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? t('login.loading') : t('login.loginButton')}
          </button>
        </form>

        <p className="register-link">
          {t('login.noAccount')} <Link to="/register">{t('login.register')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 