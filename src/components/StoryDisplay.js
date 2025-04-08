import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer.js';
import { generateAudio } from '../services/audioService.js';

function StoryDisplay({ story }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [voiceType, setVoiceType] = useState('female');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  if (!story) return null;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(story.content);
    alert('Historia copiada al portapapeles');
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

      console.log("Respuesta completa del servidor:", audioData);
    console.log("Tipo de respuesta:", typeof audioData);
    console.log("Propiedades disponibles:", Object.keys(audioData));
    
    if (audioData.audioUrl) {
      console.log("audioUrl encontrado:", audioData.audioUrl.substring(0, 50) + "...");
      setAudioUrl(audioData.audioUrl);
    } else if (audioData.audioData) {
      console.log("audioData encontrado, convirtiendo a URL...");
      setAudioUrl(`data:audio/mp3;base64,${audioData.audioData}`);
    } else {
      console.error("No se encontró audioUrl ni audioData en la respuesta");
      throw new Error("La respuesta del servidor no contiene datos de audio");
    }

      setAudioUrl(audioData.audioUrl);
      console.log("audioUrl establecido en estado:", audioUrl ? "Sí" : "No");

    } catch (error) {
      console.error('Error generating audio:', error);
      alert('Hubo un error al generar el audio. Por favor, inténtalo de nuevo.');
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <div className="story-display">
      <h3>
        <span className="title-icon">📖</span>
        {story.title || 'Tu Historia'}
      </h3>

      <div className="story-content">
        {story.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="story-actions">
        <div className="action-section">
          <div className="action-title">Opciones de texto:</div>
          <div className="text-actions">
            <button onClick={handleCopyToClipboard}>
              <span className="btn-icon">📋</span> Copiar texto
            </button>
            <button onClick={handleDownloadText}>
              <span className="btn-icon">💾</span> Descargar texto
            </button>
          </div>
        </div>

        <div className="action-section">
          <div className="action-title">Convertir a audio:</div>
          <div className="audio-actions">
            <div className="voice-selector">
              <label htmlFor="voiceType">Tipo de voz:</label>
              <select
                id="voiceType"
                value={voiceType}
                onChange={(e) => setVoiceType(e.target.value)}
                disabled={isGeneratingAudio}
              >
                <option value="female">Mujer (España)</option>
                <option value="male">Hombre (España)</option>
                <option value="female-latam">Mujer (Latinoamérica)</option>
                <option value="male-latam">Hombre (Latinoamérica)</option>
                <option value="female-english">Mujer Inglés (USA)</option>
                <option value="male-english">Hombre Inglés (USA)</option>
              </select>
            </div>

            <button
              onClick={handleGenerateAudio}
              disabled={isGeneratingAudio}
              className="generate-audio-btn"
            >
              {isGeneratingAudio ? (
                <>
                  <span className="spinner"></span> Generando audio...
                </>
              ) : (
                <>
                  <span className="btn-icon">🔊</span> Generar Audio
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