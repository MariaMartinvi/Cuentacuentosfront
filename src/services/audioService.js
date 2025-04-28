// audioService.js
import { getAuthHeader } from './authService';

export const generateAudio = async (options) => {
  try {
    // Extract properties from options object
    const { text, voiceId, speechRate } = options;
    
    // Verify that text is a valid string
    if (typeof text !== 'string') {
      console.error('Error: text is not a valid string', text);
      throw new Error('The text for audio generation must be a string');
    }

    console.log('Starting audio generation with text:', text.substring(0, 50) + '...');
    console.log('Using voice:', voiceId);
    
    // Determine the correct URL based on environment
    const isProduction = window.location.hostname !== 'localhost';
    const audioFunctionUrl = isProduction 
      ? 'https://backmielda.onrender.com/api/audio/generate'
      : 'http://localhost:5001/api/audio/generate';

    console.log('Calling function at:', audioFunctionUrl);

    const response = await fetch(audioFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ text, voiceId, speechRate }),
      credentials: 'include' // Include cookies in the request
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error al generar el audio (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generando audio:', error);
    throw new Error(error.message || 'Error desconocido al generar audio');
  }
};