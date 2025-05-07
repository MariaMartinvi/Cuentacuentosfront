import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';
import SEO from './SEO';

const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError(t('register.passwordsDontMatch'));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        await login(response.data.token);
        setSuccess(t('register.success'));
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || t('register.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://generadorcuentos.onrender.com'
        : process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const frontendUrl = window.location.origin;
      
      setTimeout(() => {
        window.location.href = `${apiUrl}/api/auth/google?redirect_uri=${encodeURIComponent(frontendUrl)}`;
      }, 300);
    } catch (err) {
      console.error('Google sign in error:', err);
      setLoading(false);
      setError(t('register.error'));
    }
  };

  return (
    <div className="register-container">
      <SEO 
        title={i18n.language === 'es' ? 
          'Registro - Mi Cuentacuentos' : 
          'Register - My Storyteller'}
        description={i18n.language === 'es' ? 
          'Crea una cuenta en Mi Cuentacuentos y comienza a generar cuentos personalizados para niños. Regístrate gratis y obtén cuentos de prueba.' : 
          'Create an account on My Storyteller and start generating personalized stories for children. Register for free and get trial stories.'}
        keywords={['registro', 'crear cuenta', 'sign up', 'cuenta gratis', 'cuentos personalizados']}
        lang={i18n.language}
      />
      
      <div className="register-card">
        <h1 className="register-title">{t('register.title')}</h1>
        <p className="register-subtitle">{t('register.subtitle')}</p>
        
        <div className="free-stories-banner">
          <div className="free-stories-icon">🎁</div>
          <div className="free-stories-text">
            <p className="free-stories-title">{t('register.freeStories')}</p>
            <p className="free-stories-subtitle">{t('register.subscribeLater')}</p>
          </div>
        </div>

        <button 
          className="google-signin-button"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="spinner small-spinner"></div>
              {t('register.loading')}
            </>
          ) : (
            <>
              <img 
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
                alt="Google" 
                className="google-icon" 
              />
              {t('register.signInWithGoogle')}
            </>
          )}
        </button>

        <div className="divider">
          <span>{t('register.or')}</span>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">{t('register.emailLabel')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('register.emailPlaceholder')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('register.passwordLabel')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('register.passwordPlaceholder')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">{t('register.confirmPasswordLabel')}</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('register.confirmPasswordPlaceholder')}
              required
            />
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={loading}
          >
            {loading ? t('register.loading') : t('register.registerButton')}
          </button>
        </form>

        <p className="login-link">
          {t('register.loginLink')}
        </p>
      </div>
    </div>
  );
};

export default Register; 