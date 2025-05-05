// filepath: c:\Users\Tiendeo\nombre-del-proyecto\src\components\pages\TerminosPage.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import './TerminosPage.css';

const TerminosPage = () => {
  const { t } = useTranslation();

  return (
    <div className="terminos-page">
      <div className="page-header">
        <h1>{t('terminos.title')}</h1>
      </div>

      <div className="terminos-container">
        <div className="terminos-content">
          <section className="terminos-section">
            <h2>{t('terminos.introduccion')}</h2>
            <p>{t('terminos.introduccionTexto')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terminos.uso')}</h2>
            <p>{t('terminos.usoTexto')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terminos.suscripcion')}</h2>
            <p>{t('terminos.suscripcionTexto')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terminos.propiedad')}</h2>
            <p>{t('terminos.propiedadTexto')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terminos.limitacion')}</h2>
            <p>{t('terminos.limitacionTexto')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terminos.contacto')}</h2>
            <p>{t('terminos.contactoTexto')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TerminosPage;