import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AudioPlayer from './AudioPlayer.js';
import { generateAudio } from '../services/audioService.js';

function StoryDisplay({ story }) {
  const { t } = useTranslation();
  const [audioUrl, setAudioUrl] = useState(null);
  const [voiceType, setVoiceType] = useState('female');
  const [speechRate, setSpeechRate] = useState(0.7); // Default to slow speed
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioCount, setAudioCount] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);

  if (!story) return null;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(story.content);
    setAlertMessage(t('storyDisplay.copySuccess'));
    setTimeout(() => setAlertMessage(null), 3000);
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
    if (audioCount >= 4) {
      setAlertMessage(t('storyDisplay.audioLimitReached'));
      setTimeout(() => setAlertMessage(null), 5000);
      return;
    }

    setIsGeneratingAudio(true);

    try {
      console.log("Solicitando audio para texto:", story.content.substring(0, 50) + "...");

      const audioData = await generateAudio({
        text: story.content,
        voiceId: voiceType,
        speechRate: speechRate
      });

      if (!audioData) {
        throw new Error('No se recibieron datos de audio del servidor');
      }

      console.log("Respuesta del servidor:", audioData);
      
      if (audioData.audioUrl) {
        console.log("URL de audio recibida:", audioData.audioUrl.substring(0, 50) + "...");
        setAudioUrl(audioData.audioUrl);
        setAudioCount(prev => prev + 1);
      } else if (audioData.audioData) {
        console.log("Datos de audio recibidos, convirtiendo a URL...");
        setAudioUrl(`data:audio/mp3;base64,${audioData.audioData}`);
        setAudioCount(prev => prev + 1);
      } else {
        throw new Error("La respuesta del servidor no contiene datos de audio válidos");
      }

    } catch (error) {
      console.error('Error generating audio:', error);
      setAlertMessage(t('storyDisplay.audioError') + ': ' + error.message);
      setTimeout(() => setAlertMessage(null), 5000);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <div className="story-display">
      {alertMessage && (
        <div className="alert-message">
          {alertMessage}
        </div>
      )}

      <h3>
        <span className="title-icon">📖</span>
        {story.title || t('storyDisplay.title')}
      </h3>

      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

      <div className="action-section audio-section">
        <div className="action-title">{t('storyDisplay.audioOptions')}</div>
        <div className="audio-actions">
          <div className="voice-selector">
            <label htmlFor="voiceType">{t('storyDisplay.voiceType')}</label>
            <select
              id="voiceType"
              value={voiceType}
              onChange={(e) => setVoiceType(e.target.value)}
              disabled={isGeneratingAudio || audioCount >= 4}
            >
              <option value="female">{t('storyDisplay.voiceFemale')}</option>
              <option value="male">{t('storyDisplay.voiceMale')}</option>
              <option value="female-latam">{t('storyDisplay.voiceFemaleLatam')}</option>
              <option value="male-latam">{t('storyDisplay.voiceMaleLatam')}</option>
              <option value="female-english">{t('storyDisplay.voiceFemaleEnglish')}</option>
              <option value="male-english">{t('storyDisplay.voiceMaleEnglish')}</option>
            </select>
          </div>

          <div className="speed-selector">
            <label htmlFor="speechRate">{t('storyDisplay.speechRate')}</label>
            <select
              id="speechRate"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              disabled={isGeneratingAudio || audioCount >= 4}
            >
              <option value="0.5">{t('storyDisplay.speedVerySlow')}</option>
              <option value="0.7">{t('storyDisplay.speedSlow')}</option>
              <option value="0.8">{t('storyDisplay.speedNormal')}</option>
              <option value="1.0">{t('storyDisplay.speedFast')}</option>
              <option value="1.2">{t('storyDisplay.speedVeryFast')}</option>
            </select>
          </div>

          <button
            onClick={handleGenerateAudio}
            disabled={isGeneratingAudio || audioCount >= 4}
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
        {audioCount >= 4 && (
          <div className="audio-limit-message">
            {t('storyDisplay.audioLimitReached')}
          </div>
        )}
      </div>

      <div className="story-content">
        {story.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

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
    </div>
  );
}

export default StoryDisplay;