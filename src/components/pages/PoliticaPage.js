import React from 'react';
import { useTranslation } from 'react-i18next';
import './PoliticaPage.css';

const PoliticaPage = () => {
  const { t } = useTranslation();

  return (
    <div className="politica-page">
      <div className="page-header">
        <h1>{t('politica.title')}</h1>
      </div>

      <div className="politica-container">
        <div className="politica-content">
          <section className="politica-section">
            <h2>{t('politica.introduccion')}</h2>
            <p>{t('politica.introduccionTexto')}</p>
          </section>

          <section className="politica-section">
            <h2>{t('politica.datos')}</h2>
            <p>{t('politica.datosTexto')}</p>
          </section>

          <section className="politica-section">
            <h2>{t('politica.usoDatos')}</h2>
            <p>{t('politica.usoDatosTexto')}</p>
          </section>

          <section className="politica-section">
            <h2>{t('politica.seguridad')}</h2>
            <p>{t('politica.seguridadTexto')}</p>
          </section>

          <section className="politica-section">
            <h2>{t('politica.cookies')}</h2>
            <p>{t('politica.cookiesTexto')}</p>
          </section>

          <section className="politica-section">
            <h2>{t('politica.derechos')}</h2>
            <p>{t('politica.derechosTexto')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPage;