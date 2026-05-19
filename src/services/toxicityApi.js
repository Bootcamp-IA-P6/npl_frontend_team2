// // Vite lee la URL automáticamente desde tu archivo .env
// const BASE_URL = import.meta.env.VITE_API_URL;

// /**
//  * Envía la URL o el texto al backend/API para su análisis.
//  * @param {string} urlToAnalyze - La URL introducida por el usuario.
//  * @returns {Promise<Object>} Datos analizados por el modelo.
//  */
// export const analizarContenido = async (urlToAnalyze) => {
//   try {
//     // Concatenamos la base del .env con el endpoint de tu API
//     const response = await fetch(`${BASE_URL}/api/v1/predict`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Enviamos el formato que espera tu FastAPI
//       body: JSON.stringify({ texto: urlToAnalyze }), 
//     });

//     if (!response.ok) {
//       throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("❌ Error en el servicio de análisis:", error);
//     throw error;
//   }
// };

// Vite lee la URL automáticamente desde tu archivo .env
// Asegúrate de que VITE_API_URL=http://localhost:8080
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