import i18n from 'i18next'; // Importar i18n para usar traducciones globales

// Determinar la URL correcta basada en el entorno
const isProduction = window.location.hostname !== 'localhost';
// Actualizado para Render en lugar de Netlify
const functionUrl = isProduction 
  ? 'https://backmielda.onrender.com/api/stories/generate'  // URL para producción en Render
  : 'http://localhost:5000/api/stories/generate';  // URL para desarrollo local

// URL base para el backend
const backendBaseUrl = isProduction
  ? 'https://backmielda.onrender.com'
  : 'http://localhost:5000';

// Configuración común para fetch
const fetchConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  mode: 'cors',
  credentials: 'include'
};

export const generateStory = async (storyParams) => {
  try {
    console.log('Iniciando generación de historia con params:', storyParams);
    console.log('Llamando a función en:', functionUrl);
    console.log('Entorno:', isProduction ? 'Producción' : 'Desarrollo');
    console.log('Backend base URL:', backendBaseUrl);
    console.log('Fetch config:', fetchConfig);

    // Verificar si el backend está disponible
    try {
      console.log('Attempting health check to:', `${backendBaseUrl}/api/health`);
      
      // Simple GET request without any special headers
      const healthCheckResponse = await fetch(`${backendBaseUrl}/api/health`)
        .catch(error => {
          console.error('Network error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            type: error.type,
            cause: error.cause
          });
          throw new Error(`No se pudo conectar al servidor. Verifica que esté ejecutándose en ${backendBaseUrl}`);
        });
      
      if (!healthCheckResponse.ok) {
        throw new Error(`El servidor respondió con error: ${healthCheckResponse.status}`);
      }

      const healthData = await healthCheckResponse.json();
      console.log('Health check successful:', healthData);
    } catch (healthError) {
      console.error('Error en health check:', healthError);
      throw healthError;
    }

    // Intentar la llamada a la función
    const response = await fetch(functionUrl, {
      ...fetchConfig,
      body: JSON.stringify(storyParams),
      headers: {
        ...fetchConfig.headers,
        'Access-Control-Request-Method': 'POST'
      }
    });

    // Mostrar información sobre la respuesta
    console.log('Respuesta recibida:', {
      status: response.status,
      statusText: response.statusText,
      headers: [...response.headers.entries()]
    });

    // Si la respuesta no es exitosa, manejar el error antes de leer el cuerpo
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error HTTP ${response.status}:`, errorText);
      
      let errorMessage;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorJson.message || `Error ${response.status}`;
      } catch (e) {
        errorMessage = `Error del servidor: ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }

    // Obtener el texto completo de la respuesta
    const responseText = await response.text();
    console.log('Respuesta completa (texto):', responseText);

    // Verificar si la respuesta está vacía
    if (!responseText || responseText.trim() === '') {
      console.error('La respuesta del servidor está vacía');
      throw new Error(i18n.t('storyService.emptyResponse')); 
    }

    // Intentar parsear la respuesta como JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('Respuesta parseada:', responseData);
    } catch (e) {
      console.error('No se pudo parsear la respuesta como JSON:', e);
      throw new Error(i18n.t('storyService.invalidResponse')); 
    }

    // Si todo está bien, devolver los datos
    return responseData;
  } catch (error) {
    console.error('Error completo en generateStory:', error);

    // Mostrar toda la información posible del error
    if (error.name) console.error('Error name:', error.name);
    if (error.message) console.error('Error message:', error.message);
    if (error.stack) console.error('Error stack:', error.stack);

    // Relanzar el error traducido
    throw new Error(
      error.message || i18n.t('storyService.unknownError')
    );
  }
};