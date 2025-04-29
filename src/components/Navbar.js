import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
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
              <span className="user-email">{user.email}</span>
              {user.subscriptionStatus === 'free' && (
                <Link to="/subscribe" className="subscribe-link">
                  {t('subscription.subscribeButton')}
                </Link>
              )}
              {user.subscriptionStatus === 'cancelled' && (
                <Link to="/subscribe" className="subscribe-link">
                  {t('subscription.resubscribe')}
                </Link>
              )}
              <button onClick={handleLogout} className="logout-button">
                {t('navbar.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">
                {t('navbar.login')}
              </Link>
              <Link to="/register" className="auth-link">
                {t('navbar.register')}
              </Link>
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