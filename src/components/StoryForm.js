import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateStory } from '../services/storyService.js';

function StoryForm({ onStoryGenerated }) {
  const { t, i18n } = useTranslation();
  const [topic, setTopic] = useState('');
  const [storyLength, setStoryLength] = useState('medium');
  const [storyType, setStoryType] = useState('original');
  const [creativityLevel, setCreativityLevel] = useState('innovative');
  const [ageGroup, setAgeGroup] = useState('default');
  const [childNames, setChildNames] = useState('');
  const [englishLevel, setEnglishLevel] = useState('intermediate');
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      alert(t('storyForm.alertTopicRequired'));
      return;
    }

    setIsLoading(true);

    try {
      const generatedStory = await generateStory({
        topic,
        length: storyLength,
        storyType,
        creativityLevel,
        ageGroup,
        childNames,
        englishLevel,
        language: i18n.language
      });

      onStoryGenerated(generatedStory);
    } catch (error) {
      console.error('Error generating story:', error);
      alert(t('storyForm.alertError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTopic('');
    setStoryLength('medium');
    setStoryType('original');
    setCreativityLevel('innovative');
    setAgeGroup('default');
    setChildNames('');
    setEnglishLevel('intermediate');
    onStoryGenerated(null);
  };

  return (
    <div className="story-form-container">
      <h2>
        <span className="icon-title">🦉</span>
        {t('storyForm.title')}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="topic">
            <span className="form-icon">📝</span> {t('storyForm.topicLabel')}
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t('storyForm.topicPlaceholder')}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="childNames">
              <span className="form-icon">👶</span> {t('storyForm.childNamesLabel')}
            </label>
            <input
              type="text"
              id="childNames"
              value={childNames}
              onChange={(e) => setChildNames(e.target.value)}
              placeholder={t('storyForm.childNamesPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="englishLevel">
              <span className="form-icon">🌍</span> {t('storyForm.englishLevelLabel')}
            </label>
            <select
              id="englishLevel"
              value={englishLevel}
              onChange={(e) => setEnglishLevel(e.target.value)}
            >
              <option value="basic">{t('storyForm.englishLevelBeginner')}</option>
              <option value="intermediate">{t('storyForm.englishLevelIntermediate')}</option>
              <option value="advanced">{t('storyForm.englishLevelAdvanced')}</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="storyLength">
              <span className="form-icon">📏</span> {t('storyForm.lengthLabel')}
            </label>
            <select
              id="storyLength"
              value={storyLength}
              onChange={(e) => setStoryLength(e.target.value)}
            >
              <option value="short">{t('storyForm.lengthShort')}</option>
              <option value="medium">{t('storyForm.lengthMedium')}</option>
              <option value="long">{t('storyForm.lengthLong')}</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="storyType">
              <span className="form-icon">📚</span> {t('storyForm.typeLabel')}
            </label>
            <select
              id="storyType"
              value={storyType}
              onChange={(e) => setStoryType(e.target.value)}
            >
              <option value="original">{t('storyForm.typeOriginal')}</option>
              <option value="classic">{t('storyForm.typeClassic')}</option>
              <option value="humor">{t('storyForm.typeHumor')}</option>
              <option value="sci-fi">{t('storyForm.typeSciFi')}</option>
              <option value="horror">{t('storyForm.typeHorror')}</option>
              <option value="adventure">{t('storyForm.typeAdventure')}</option>
              <option value="fantasy">{t('storyForm.typeFantasy')}</option>
            </select>
          </div>
        </div>

        

        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="creativityLevel">
              <span className="form-icon">💡</span> {t('storyForm.creativityLabel')}
            </label>
            <select
              id="creativityLevel"
              value={creativityLevel}
              onChange={(e) => setCreativityLevel(e.target.value)}
            >
              <option value="innovative">{t('storyForm.creativityInnovative')}</option>
              <option value="imaginative">{t('storyForm.creativityImaginative')}</option>
              <option value="visionary">{t('storyForm.creativityVisionary')}</option>
              <option value="conservative">{t('storyForm.creativityConservative')}</option>
              <option value="inspired">{t('storyForm.creativityInspired')}</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ageGroup">
              <span className="form-icon">👥</span> {t('storyForm.ageLabel')}
            </label>
            <select
              id="ageGroup"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              <option value="default">{t('storyForm.ageDefault')}</option>
              <option value="3-6">{t('storyForm.age3to6')}</option>
              <option value="7-13">{t('storyForm.age7to13')}</option>
              <option value="13-20">{t('storyForm.age13to20')}</option>
              <option value="21-35">{t('storyForm.age21to35')}</option>
              <option value="35+">{t('storyForm.age35plus')}</option>
            </select>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="generate-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span> {t('storyForm.generating')}
              </>
            ) : (
              <>
                <span className="btn-icon">✨</span> {t('storyForm.generateButton')}
              </>
            )}
          </button>
          <button type="button" className="reset-btn" onClick={handleReset}>
            {t('storyForm.resetButton')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StoryForm;