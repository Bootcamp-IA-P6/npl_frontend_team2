const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Envía la URL de YouTube al backend en Go para su orquestación y análisis.
 * @param {string} urlToAnalyze - La URL introducida por el usuario.
 * @returns {Promise<Object>} Datos analizados (porcentaje, totales, detalle).
 */
export const analizarContenido = async (urlToAnalyze) => {
  try {
    // 1. Cambiamos el endpoint para que apunte a la ruta de Go
    const response = await fetch(`${BASE_URL}/api/v1/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // 2. Go espera recibir un JSON con la clave "video_url", no "texto"
      body: JSON.stringify({ video_url: urlToAnalyze }), 
    });

    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status} ${response.statusText}`);
    }

    // 3. Este data ahora es el JSON gigante y rico que devuelve Go
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error en el orquestador backend:", error);
    throw error;
  }
};