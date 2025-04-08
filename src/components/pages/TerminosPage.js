// filepath: c:\Users\Tiendeo\nombre-del-proyecto\src\components\pages\TerminosPage.js
import React from 'react';
import '../../styles/terminos.css';
import { useTranslation } from 'react-i18next';

function TerminosPage() {
  const { t, i18n } = useTranslation();


  return (
    <div className="page terminos-page">
      <h1 className="page-title">{t('terms.title')}</h1>

      <section className="section">
        <h2 className="section-title">1. {t('terms.introduction')}</h2>
        <p>{t('terms.introduction')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">2. {t('terms.serviceUse')}</h2>
        <p>{t('terms.serviceUse')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">3. {t('terms.intellectualProperty')}</h2>
        <p>{t('terms.intellectualProperty')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">4. {t('terms.liability')}</h2>
        <p>{t('terms.liability')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">5. {t('terms.changes')}</h2>
        <p>{t('terms.changes')}</p>
      </section>


    </div>
  );
}

export default TerminosPage;