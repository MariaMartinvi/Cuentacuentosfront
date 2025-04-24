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
        <h2 className="section-title">1. {t('terms.introductiontitle')}</h2>
        <p>{t('terms.introduction')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">2. {t('terms.serviceUsetitle')}</h2>
        <p>{t('terms.serviceUse')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">3. {t('terms.intellectualPropertytitle')}</h2>
        <p>{t('terms.intellectualProperty')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">4. {t('terms.liabilitytitle')}</h2>
        <p>{t('terms.liability')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">5. {t('terms.privacytitle')}</h2>
        <p>{t('terms.privacy')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">6. {t('terms.googleAdsensetitle')}</h2>
        <p>{t('terms.googleAdsense')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">7. {t('terms.linkstitle')}</h2>
        <p>{t('terms.links')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">8. {t('terms.changestitle')}</h2>
        <p>{t('terms.changes')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">9. {t('terms.lawtitle')}</h2>
        <p>{t('terms.law')}</p>
      </section>

      <section className="section">
        <h2 className="section-title">10. {t('terms.contacttitle')}</h2>
        <p>{t('terms.contact')}</p>
      </section>


    </div>
  );
}

export default TerminosPage;