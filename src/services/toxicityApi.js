// Vite lee la URL automáticamente desde tu archivo .env
const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Envía la URL o el texto al backend/API para su análisis.
 * @param {string} urlToAnalyze - La URL introducida por el usuario.
 * @returns {Promise<Object>} Datos analizados por el modelo.
 */
export const analizarContenido = async (urlToAnalyze) => {
  try {
    // Concatenamos la base del .env con el endpoint de tu API
    const response = await fetch(`${BASE_URL}/api/v1/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Enviamos el formato que espera tu FastAPI
      body: JSON.stringify({ texto: urlToAnalyze }), 
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error en el servicio de análisis:", error);
    throw error;
  }
};