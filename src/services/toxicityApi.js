import { createClient } from '@supabase/supabase-js';

const BASE_URL = import.meta.env.VITE_API_URL;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializamos el cliente de Supabase de forma segura usando las variables de entorno
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Envía la URL de YouTube al backend en Go para su orquestación y análisis.
 * @param {string} urlToAnalyze - La URL introducida por el usuario.
 * @returns {Promise<Object>} Datos analizados (porcentaje, totales, detalle).
 */
export const analizarContenido = async (urlToAnalyze) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video_url: urlToAnalyze }), 
    });

    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error en el orquestador backend:", error);
    throw error;
  }
};

/**
 * Recupera todos los comentarios de Supabase que guardó tu backend en Go
 * y los agrupa automáticamente por video_id calculando las métricas de la IA.
 */
export const obtenerHistorialGlobal = async () => {
  try {
    // 🛠️ Control inicial: Si las variables no cargaron, te avisa en consola
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error("⚠️ Error: Faltan las variables de entorno de Supabase en el Frontend.");
      return [];
    }

    const { data, error } = await supabase
      .from('ToxicFilterAIPredictions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // 🕵️‍♂️ ANEXO DE MONITOREO: Para ver exactamente qué te responde Supabase en el navegador (F12)
    console.log("📥 Datos crudos recibidos desde la tabla de Supabase:", data);

    if (!data || data.length === 0) {
      console.warn("⚠️ Supabase respondió con un array vacío. No hay registros aún.");
      return [];
    }

    // Agrupamos los comentarios individuales por el id del video
    const videosAgrupados = data.reduce((acc, current) => {
      // 🛠️ ANEXO DE SEGURIDAD: Si video_id viene null o indefinido, lo salvamos para que no rompa la app
      const idVideo = current.video_id || "VIDEO_SIN_ID";
      const esToxico = current.is_toxic;
      
      if (!acc[idVideo]) {
        acc[idVideo] = {
          video_id: idVideo,
          totalComentarios: 0,
          comentariosToxicos: 0,
          comentariosSeguros: 0,
          fecha: current.created_at
        };
      }

      acc[idVideo].totalComentarios += 1;
      if (esToxico) {
        acc[idVideo].comentariosToxicos += 1;
      } else {
        acc[idVideo].comentariosSeguros += 1;
      }

      return acc;
    }, {});

    // Calculamos el porcentaje de toxicidad de cada video agrupado
    const resultadoFinal = Object.values(videosAgrupados).map(video => {
      const porcentaje = video.totalComentarios > 0 
        ? ((video.comentariosToxicos / video.totalComentarios) * 100).toFixed(1)
        : 0;
      return {
        ...video,
        porcentajeToxicidad: parseFloat(porcentaje)
      };
    });

    console.log("📊 Datos procesados y listos para las vistas de Analytics/History:", resultadoFinal);
    return resultadoFinal;

  } catch (error) {
    console.error("❌ Error al obtener el historial de Supabase:", error);
    return [];
  }
};

/**
 * Elimina un video (y todos sus comentarios asociados) en Supabase por su video_id
 */
export const eliminarAnalisisVideo = async (videoId) => {
  try {
    const { error } = await supabase
      .from('ToxicFilterAIPredictions')
      .delete()
      .eq('video_id', videoId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("❌ Error al eliminar el video en Supabase:", error);
    throw error;
  }
};