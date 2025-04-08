import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { i18n } = useTranslation();

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
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Servicios</Link>
          <Link to="/contact">Contacto</Link>
        </div>
        <div className="nav-links">
          <button
            onClick={() => changeLanguage('en')}
            className={`language-button ${
              i18n.language === 'en' ? 'active-language' : ''
            }`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className={`language-button ${
              i18n.language === 'es' ? 'active-language' : ''
            }`}
          >
            Español
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;