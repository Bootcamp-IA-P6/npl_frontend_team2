

import { useState, useEffect } from 'react'

export default function History() {
  // ESTADO INICIAL SEGURO: Evita errores de "window is not defined" al compilar en Vercel
  const [videosHistorial, setVideosHistorial] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('historial_videos')) || []
    }
    return []
  })

  // Sincroniza los datos al cargar la pestaña
  useEffect(() => {
    const historial = JSON.parse(localStorage.getItem('historial_videos')) || []
    setVideosHistorial(historial)
  }, [])

  // Función para borrar un video individual del historial
  const eliminarDeHistorial = (id) => {
    const nuevoHistorial = videosHistorial.filter(video => video.video_id !== id)
    setVideosHistorial(nuevoHistorial)
    localStorage.setItem('historial_videos', JSON.stringify(nuevoHistorial))
  }

  // 🎨 Función de color unificada para que coincida exactamente con RecentCard
  const obtenerEstiloToxicidad = (pct) => {
    if (pct >= 60) {
      return { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' } // High Risk (Rojo)
    }
    if (pct >= 30) {
      return { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' } // Neutral (Ámbar)
    }
    return { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' } // Healthy (Verde)
  }

  // Vista vacía
  if (videosHistorial.length === 0) {
    return (
      <div className="p-6 text-zinc-500 text-center font-sans mt-12">
        📭 No hay videos en el historial todavía. ¡Prueba analizando uno en el Home!
      </div>
    )
  }

  return (
    <div className="p-6 flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white font-sans">Historial de Videos Analizados</h2>
        <span className="text-xs text-zinc-500 font-mono bg-zinc-900 px-2.5 py-1 rounded-md border border-[#232329]">
          {videosHistorial.length} guardados
        </span>
      </div>
      
      <div className="flex flex-col gap-3">
        {videosHistorial.map((video) => {
          // 💡 AQUÍ ESTÁ EL CAMBIO: Buscamos el nombre nuevo (promedio_toxicidad). 
          // Si no existe (por si es un video muy antiguo), usamos porcentaje_toxicidad. Y si falla todo, un 0.
          const pct = video.promedio_toxicidad ?? video.porcentaje_toxicidad ?? 0;
          const estilosDinamicos = obtenerEstiloToxicidad(pct);

          return (
            <div 
              key={video.id || video.video_id} 
              className="flex items-center justify-between p-4 bg-[#16161a] border border-[#232329] rounded-xl transition-all hover:border-zinc-700"
            >
              {/* Información del video */}
              <div className="flex flex-col gap-1 min-w-0 flex-1 pr-4">
                <span className="text-white font-semibold text-sm truncate">
                  {video.video_title || "Video de YouTube"}
                </span>
                
                {/* Mostramos la URL en un enlace púrpura interactivo */}
                <a 
                  href={video.video_url || `https://www.youtube.com/watch?v=${video.video_id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-purple-400 hover:text-purple-300 font-mono truncate underline block mt-0.5"
                >
                  {video.video_url || `https://www.youtube.com/watch?v=${video.video_id}`}
                </a>
              </div>

              {/* Métrica de toxicidad y acción de borrar */}
              <div className="flex items-center gap-4 shrink-0">
                <span 
                  className="text-xs font-bold px-2.5 py-1 rounded-lg font-sans"
                  style={estilosDinamicos}
                >
                  {pct.toFixed(1)}% Tóxico
                </span>
                
                <button 
                  onClick={() => eliminarDeHistorial(video.video_id)}
                  className="text-zinc-500 hover:text-red-400 text-sm transition-colors p-1"
                  title="Eliminar del historial"
                >
                  🗑️
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

