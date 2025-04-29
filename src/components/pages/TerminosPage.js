// filepath: c:\Users\Tiendeo\nombre-del-proyecto\src\components\pages\TerminosPage.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import './TerminosPage.css';

const TerminosPage = () => {
  const { t } = useTranslation();

  return (
    <div className="terminos-page">
      <div className="page-header">
        <h1>{t('terms.title')}</h1>
      </div>

      <div className="terminos-container">
        <div className="terminos-content">
          <section className="terminos-section">
            <h2>{t('terms.acceptance')}</h2>
            <p>{t('terms.content')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terms.serviceDescription')}</h2>
            <p>{t('terms.serviceContent')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terms.userObligations')}</h2>
            <p>{t('terms.obligationsContent')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terms.privacy')}</h2>
            <p>{t('terms.privacyContent')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terms.cancellation')}</h2>
            <p>{t('terms.cancellationContent')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terms.liability')}</h2>
            <p>{t('terms.liabilityContent')}</p>
          </section>

          <section className="terminos-section">
            <h2>{t('terms.changes')}</h2>
            <p>{t('terms.changesContent')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TerminosPage;