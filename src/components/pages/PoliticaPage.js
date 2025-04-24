import React from 'react';
import '../../styles/politica.css';
import { useTranslation } from 'react-i18next';

function PoliticaPage() {
  const { t, i18n } = useTranslation();


  return (
    <div className="page terminos-page">
      <h1 className="page-title">{t('politica.title')}</h1>

      <section className="section">
        <h2 className="section-title">1. {t('politica.introductiontitle')}</h2>
        <p>{t('politica.introduction')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">2. {t('politica.serviceUsetitle')}</h2>
        <p>{t('politica.serviceUse')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">3. {t('politica.intellectualPropertytitle')}</h2>
        <p>{t('politica.intellectualProperty')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">4. {t('politica.liabilitytitle')}</h2>
        <p>{t('politica.liability')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">5. {t('politica.privacytitle')}</h2>
        <p>{t('politica.privacy')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">6. {t('politica.googleAdsensetitle')}</h2>
        <p>{t('politica.googleAdsense')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">7. {t('politica.linkstitle')}</h2>
        <p>{t('politica.links')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">8. {t('politica.changestitle')}</h2>
        <p>{t('politica.changes')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">9. {t('politica.lawtitle')}</h2>
        <p>{t('politica.law')}</p>
      </section>




    </div>
  );
}

export default PoliticaPage;