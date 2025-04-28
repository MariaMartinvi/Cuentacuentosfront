// src/components/pages/AboutPage.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import './AboutPage.css';

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('about.title')}</h1>
          <p>{t('about.mission.text')}</p>
        </div>
      </div>
      
      <div className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZAPXyhn2F-0_r5_gYfbrOC6LGqDk7wP2qKw&s" alt="Libros y creatividad" />
            </div>
            <div className="about-text">
              <h2>{t('about.mission.title')}</h2>
              <p>{t('about.mission.text')}</p>
              
              <h2>{t('about.vision.title')}</h2>
              <p>{t('about.vision.text')}</p>
              
              <h2>{t('about.team.title')}</h2>
              <p>{t('about.team.text')}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="team-section">
        <div className="container">
          <h2 className="section-title">{t('about.values.title')}</h2>
          <div className="team-grid">
            <div className="team-member">
              <h3>{t('about.values.creatividad')}</h3>
              <p>{t('about.values.creatividadText')}</p>
            </div>
            <div className="team-member">
              <h3>{t('about.values.accesibilidad')}</h3>
              <p>{t('about.values.accesibilidadText')}</p>
            </div>
            <div className="team-member">
              <h3>{t('about.values.calidad')}</h3>
              <p>{t('about.values.calidadText')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;