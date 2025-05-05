import React from 'react';
import { useTranslation } from 'react-i18next';
import './ComoFuncionaPage.css';

const ComoFuncionaPage = () => {
  const { t } = useTranslation();

  return (
    <div className="como-funciona-page">
      <div className="page-header">
        <h1>{t('comoFunciona.title')}</h1>
      </div>

      <div className="como-funciona-container">
        <div className="como-funciona-content">
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h2>{t('comoFunciona.step1.title')}</h2>
              <p>{t('comoFunciona.step1.description')}</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h2>{t('comoFunciona.step2.title')}</h2>
              <p>{t('comoFunciona.step2.description')}</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h2>{t('comoFunciona.step3.title')}</h2>
              <p>{t('comoFunciona.step3.description')}</p>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <h2>{t('comoFunciona.step4.title')}</h2>
              <p>{t('comoFunciona.step4.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComoFuncionaPage;