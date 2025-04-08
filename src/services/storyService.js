import i18n from 'i18next'; // Importar i18n para usar traducciones globales

// Determinar la URL correcta basada en el entorno
const isProduction = window.location.hostname !== 'localhost';
// Actualizado para Render en lugar de Netlify
const functionUrl = isProduction 
  ? 'https://backmielda.onrender.com/api/stories/generate'  // URL para producción en Render
  : 'http://localhost:5000/api/stories/generate';  // URL para desarrollo local

export const generateStory = async (storyParams) => {
  try {
    console.log('Iniciando generación de historia con params:', storyParams);
    console.log('Llamando a función en:', functionUrl);

    // Intentar la llamada a la función
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyParams),
    });

    // Mostrar información sobre la respuesta
    console.log('Respuesta recibida, status:', response.status);
    console.log('Headers:', [...response.headers.entries()]);

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