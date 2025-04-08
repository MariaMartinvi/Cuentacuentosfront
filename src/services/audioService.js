// audioService.js

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
      ? 'https://backmielda.onrender.com/api/audio/generate'  // Corrected URL for production
      : 'http://localhost:5000/api/audio/generate';  // URL for local development

    console.log('Calling function at:', audioFunctionUrl);

    const response = await fetch(audioFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, voiceId, speechRate }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('Error al generar el audio: ' + errorText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generando audio:', error);
    throw new Error(error.message || 'Error desconocido al generar audio');
  }
};