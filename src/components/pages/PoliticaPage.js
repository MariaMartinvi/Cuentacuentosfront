import React from 'react';
import { useTranslation } from 'react-i18next';
import './PoliticaPage.css';

const PoliticaPage = () => {
  const { t } = useTranslation();

  return (
    <div className="politica-page">
      <div className="page-header">
        <h1>{t('privacy.title')}</h1>
      </div>

      <div className="politica-container">
        <div className="politica-content">
          <section className="politica-section">
            <h2>{t('privacy.dataCollection')}</h2>
            <p>{t('privacy.collectionContent')}</p>
          </section>

          <section className="politica-section">
            <h2>{t('privacy.dataUsage')}</h2>
            <p>{t('privacy.usageContent')}</p>
          </section>

          <section className="politica-section">
            <h2>{t('privacy.dataProtection')}</h2>
            <p>{t('privacy.protectionContent')}</p>
          </section>

          <section className="politica-section">
            <h2>{t('privacy.cookies')}</h2>
            <p>{t('privacy.cookiesContent')}</p>
          </section>

          <section className="politica-section">
            <h2>{t('privacy.rights')}</h2>
            <p>{t('privacy.rightsContent')}</p>
          </section>

          <section className="politica-section">
            <h2>{t('privacy.changes')}</h2>
            <p>{t('privacy.changesContent')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPage;