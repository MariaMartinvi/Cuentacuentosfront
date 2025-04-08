import React from 'react';
import '../styles/footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Generador de Cuentos IA</h3>
            <p>Crea historias cautivadoras en español con inteligencia artificial. Personaliza, genera y escucha tus cuentos con nuestra herramienta gratuita.</p>
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="80" rx="16" fill="#4361ee"/>
                <path d="M20 25H60M20 40H60M20 55H40" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="50" cy="55" r="5" fill="white"/>
              </svg>
            </div>
          </div>

          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li><a href="/como-funciona">Cómo Funciona</a></li>
              <li><a href="/terminos-y-condiciones">Términos y Condiciones</a></li>
              <li><a href="/politica-de-privacidad">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="centered-text">© {currentYear} Generador de Cuentos IA. Todos los derechos reservados.</p>
          <div className="made-with">
            Hecho con <span className="heart">❤️</span> en Barcelona
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;