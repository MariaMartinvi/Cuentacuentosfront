import React from 'react';
import { useTranslation } from 'react-i18next';
import './ComoFuncionaPage.css';

const ComoFuncionaPage = () => {
  const { t } = useTranslation();

  return (
    <div className="como-funciona-page">
      <div className="page-header">
        <h1>{t('howItWorks.title')}</h1>
      </div>

      <div className="como-funciona-container">
        <div className="como-funciona-content">
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h2>{t('howItWorks.step1')}</h2>
              <p>{t('howItWorks.step1Description')}</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h2>{t('howItWorks.step2')}</h2>
              <p>{t('howItWorks.step2Description')}</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h2>{t('howItWorks.step3')}</h2>
              <p>{t('howItWorks.step3Description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComoFuncionaPage;