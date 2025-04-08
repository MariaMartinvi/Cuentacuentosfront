// audioService.js


export const generateAudio = async (options) => {
  try {
    // Extraer propiedades del objeto de opciones
    const { text, voiceId, speechRate } = options;
    
    // Verificar que text sea un string válido
    if (typeof text !== 'string') {
      console.error('Error: el texto no es una cadena válida', text);
      throw new Error('El texto para generar audio debe ser una cadena');
    }

    console.log('Iniciando generación de audio con texto:', text.substring(0, 50) + '...');
    console.log('Usando voz:', voiceId);
    
    // Determinar la URL correcta basada en el entorno
    const isProduction = window.location.hostname !== 'localhost';
    const audioFunctionUrl = isProduction 
      ? '/.netlify/functions/generate-audio'  // URL para producción en Netlify
      : 'http://localhost:5000/api/audio/generate';  // URL para desarrollo local

    console.log('Llamando a función en:', audioFunctionUrl);

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