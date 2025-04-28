import React, { useState } from 'react';
import StoryForm from '../StoryForm.js';
import { useTranslation } from 'react-i18next';
import StoryDisplay from '../StoryDisplay.js';
import '../../styles/global.css';

function HomePage() {
  const [generatedStory, setGeneratedStory] = useState(null);
  const { t } = useTranslation();

  const handleStoryGenerated = (story) => {
    setGeneratedStory(story);

    // Scroll to story if generated
    if (story) {
      setTimeout(() => {
        const storyDisplay = document.querySelector('.story-display');
        if (storyDisplay) {
          storyDisplay.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="app">
      <div className="hero-section">
        <div className="hero-container">
          <h1>{t('homepage.heroTitle')}</h1>
          <p>{t('homepage.heroDescription')}</p>
        </div>
      </div>

      <main className="container">
        <StoryForm onStoryGenerated={handleStoryGenerated} />

        {generatedStory && (
          <StoryDisplay story={generatedStory} />
        )}

        {!generatedStory && (
          <div className="features-preview">
            <h2>{t('homepage.featuresTitle')}</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">✨</div>
                <h3>{t('homepage.uniqueStoriesTitle')}</h3>
                <p>{t('homepage.uniqueStoriesDescription')}</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎭</div>
                <h3>{t('homepage.multipleGenresTitle')}</h3>
                <p>{t('homepage.multipleGenresDescription')}</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔊</div>
                <h3>{t('homepage.audioConversionTitle')}</h3>
                <p>{t('homepage.audioConversionDescription')}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;