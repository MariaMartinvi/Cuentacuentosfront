// src/components/pages/AboutPage.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import './AboutPage.css';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="page-header">
        <h1>{t('about.title')}</h1>
        <p>{t('about.subtitle')}</p>
      </div>

      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>{t('about.missionTitle')}</h2>
            <p>{t('about.missionText')}</p>
          </div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>{t('about.visionTitle')}</h2>
            <p>{t('about.visionText')}</p>
          </div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>{t('about.teamTitle')}</h2>
            <p>{t('about.teamText')}</p>
          </div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>{t('about.valuesTitle')}</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>{t('about.values.creativity')}</h3>
                <p>{t('about.values.creativityText')}</p>
              </div>
              <div className="value-item">
                <h3>{t('about.values.education')}</h3>
                <p>{t('about.values.educationText')}</p>
              </div>
              <div className="value-item">
                <h3>{t('about.values.innovation')}</h3>
                <p>{t('about.values.innovationText')}</p>
              </div>
              <div className="value-item">
                <h3>{t('about.values.quality')}</h3>
                <p>{t('about.values.qualityText')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;