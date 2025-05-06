import React from 'react';
import { useTranslation } from 'react-i18next';
import './ComoFuncionaPage.css';

const ComoFuncionaPage = () => {
  const { t } = useTranslation();

  const steps = [
    {
      key: 'step1',
      icon: '🎯'
    },
    {
      key: 'step2',
      icon: '✨'
    },
    {
      key: 'step3',
      icon: '🎧'
    }
  ];

  return (
    <div className="como-funciona-page">
      <div className="page-header">
        <h1>{t('comoFunciona.title')}</h1>
        <p>{t('comoFunciona.description')}</p>
      </div>

      <div className="como-funciona-container">
        <div className="como-funciona-content">
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={step.key} className="step">
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h2>{t(`comoFunciona.${step.key}.title`)}</h2>
                <p>{t(`comoFunciona.${step.key}.description`)}</p>
                <div className="step-features">
                  {Object.keys(t(`comoFunciona.${step.key}.features`, { returnObjects: true })).map((feature) => (
                    <div key={feature} className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span className="feature-text">
                        {t(`comoFunciona.${step.key}.features.${feature}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComoFuncionaPage;