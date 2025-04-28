import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AudioPlayer from './AudioPlayer.js';
import { generateAudio } from '../services/audioService.js';

function StoryDisplay({ story }) {
  const { t } = useTranslation();
  const [audioUrl, setAudioUrl] = useState(null);
  const [voiceType, setVoiceType] = useState('female');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  if (!story) return null;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(story.content);
    alert(t('storyDisplay.copySuccess'));
  };

  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([story.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `historia-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleGenerateAudio = async () => {
    setIsGeneratingAudio(true);

    try {
      console.log("Solicitando audio para texto:", story.content.substring(0, 50) + "...");

      const audioData = await generateAudio({
        text: story.content,
        voiceId: voiceType,
        speechRate: 1.0
      });

      if (!audioData) {
        throw new Error('No se recibieron datos de audio del servidor');
      }

      console.log("Respuesta del servidor:", audioData);
      
      if (audioData.audioUrl) {
        console.log("URL de audio recibida:", audioData.audioUrl.substring(0, 50) + "...");
        setAudioUrl(audioData.audioUrl);
      } else if (audioData.audioData) {
        console.log("Datos de audio recibidos, convirtiendo a URL...");
        setAudioUrl(`data:audio/mp3;base64,${audioData.audioData}`);
      } else {
        throw new Error("La respuesta del servidor no contiene datos de audio válidos");
      }

    } catch (error) {
      console.error('Error generating audio:', error);
      alert(t('storyDisplay.audioError') + ': ' + error.message);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <div className="story-display">
      <h3>
        <span className="title-icon">📖</span>
        {story.title || t('storyDisplay.title')}
      </h3>

      <div className="story-content">
        {story.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="story-actions">
        <div className="action-section">
          <div className="action-title">{t('storyDisplay.textOptions')}</div>
          <div className="text-actions">
            <button onClick={handleCopyToClipboard}>
              <span className="btn-icon">📋</span> {t('storyDisplay.copyText')}
            </button>
            <button onClick={handleDownloadText}>
              <span className="btn-icon">💾</span> {t('storyDisplay.downloadText')}
            </button>
          </div>
        </div>

        <div className="action-section">
          <div className="action-title">{t('storyDisplay.audioOptions')}</div>
          <div className="audio-actions">
            <div className="voice-selector">
              <label htmlFor="voiceType">{t('storyDisplay.voiceType')}</label>
              <select
                id="voiceType"
                value={voiceType}
                onChange={(e) => setVoiceType(e.target.value)}
                disabled={isGeneratingAudio}
              >
                <option value="female">{t('storyDisplay.voiceFemale')}</option>
                <option value="male">{t('storyDisplay.voiceMale')}</option>
                <option value="female-latam">{t('storyDisplay.voiceFemaleLatam')}</option>
                <option value="male-latam">{t('storyDisplay.voiceMaleLatam')}</option>
                <option value="female-english">{t('storyDisplay.voiceFemaleEnglish')}</option>
                <option value="male-english">{t('storyDisplay.voiceMaleEnglish')}</option>
              </select>
            </div>

            <button
              onClick={handleGenerateAudio}
              disabled={isGeneratingAudio}
              className="generate-audio-btn"
            >
              {isGeneratingAudio ? (
                <>
                  <span className="spinner"></span> {t('storyDisplay.generatingAudio')}
                </>
              ) : (
                <>
                  <span className="btn-icon">🔊</span> {t('storyDisplay.generateAudio')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
    </div>
  );
}

export default StoryDisplay;