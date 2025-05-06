import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">🦉 Mi Cuenta Cuentos</Link>
        </div>
        <div className="nav-links">
          <Link to="/">{t('navbar.home')}</Link>
          <Link to="/contact">{t('navbar.contact')}</Link>
        </div>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/profile" className="user-name">
                {user.name || user.email}
                {user.isPremium && (
                  <span className="premium-badge">⭐ Premium</span>
                )}
              </Link>
              {!user.isPremium && (
                <Link to="/subscribe" className="subscribe-link">
                  {t('subscription.subscribeButton')}
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="login-nav-button">{t('navbar.login')}</Link>
              <Link to="/register" className="register-nav-link">{t('navbar.register')}</Link>
            </>
          )}
          <button
            onClick={() => changeLanguage('en')}
            className={`language-button ${
              i18n.language === 'en' ? 'active-language' : ''
            }`}
          >
            {t('navbar.english')}
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className={`language-button ${
              i18n.language === 'es' ? 'active-language' : ''
            }`}
          >
            {t('navbar.spanish')}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;