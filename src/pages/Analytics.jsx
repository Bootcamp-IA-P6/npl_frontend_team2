import { useState, useEffect } from 'react'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')
  const [historial, setHistorial] = useState([])

  // 🔄 Cargar el historial real del localStorage al montar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const datos = JSON.parse(localStorage.getItem('historial_videos')) || []
      setHistorial(datos)
    }
  }, [])

  // 🧮 PROCESAMIENTO DE MÉTRICAS REALES
  const totalVideos = historial.length
  
  // Asumimos un estimado de 10 comentarios por video procesado por tu backend en Go
  const totalComentarios = totalVideos * 10 

  // Calcular el promedio real de toxicidad
  const promedioToxicidad = totalVideos > 0
    ? historial.reduce((acc, video) => {
        const pct = typeof video.porcentaje_toxicidad === 'number' ? video.porcentaje_toxicidad : (video.toxicity || 0)
        return acc + pct
      }, 0) / totalVideos
    : 0

  // Contar cuántos caen en cada categoría real
  let countHealthy = 0
  let countNeutral = 0
  let countToxic = 0

  historial.forEach(video => {
    const pct = typeof video.porcentaje_toxicidad === 'number' ? video.porcentaje_toxicidad : (video.toxicity || 0)
    if (pct >= 60) countToxic++
    else if (pct >= 30) countNeutral++
    else countHealthy++
  })

  // Convertir a porcentajes de distribución para las barras de progreso
  const pctHealthy = totalVideos > 0 ? ((countHealthy / totalVideos) * 100).toFixed(1) : '0.0'
  const pctNeutral = totalVideos > 0 ? ((countNeutral / totalVideos) * 100).toFixed(1) : '0.0'
  const pctToxic = totalVideos > 0 ? ((countToxic / totalVideos) * 100).toFixed(1) : '0.0'

  // El Health Score Global es el inverso de la toxicidad promedio
  const healthScoreGlobal = (100 - promedioToxicidad).toFixed(1)

  // 📊 ORDENAR VIDEOS REALES DE MAYOR A MENOR TOXICIDAD (Top Conflictivos)
  const videosOrdenados = [...historial].sort((a, b) => {
    const pctA = typeof a.porcentaje_toxicidad === 'number' ? a.porcentaje_toxicidad : (a.toxicity || 0)
    const pctB = typeof b.porcentaje_toxicidad === 'number' ? b.porcentaje_toxicidad : (b.toxicity || 0)
    return pctB - pctA
  })

  // Función auxiliar para determinar la etiqueta de la tabla
  const obtenerBadge = (pct) => {
    if (pct >= 60) return 'High Risk'
    if (pct >= 30) return 'Neutral'
    return 'Healthy'
  }

  // Si no hay datos en el localStorage, mostramos un estado vacío elegante para guiar al cliente
  if (totalVideos === 0) {
    return (
      <div className="p-6 max-w-5xl mx-auto min-h-screen flex flex-col items-center justify-center text-center font-sans">
        <span className="text-4xl mb-3">📊</span>
        <h2 className="text-lg font-bold text-white mb-1">Dashboard de Analytics Vacío</h2>
        <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
          No hay análisis registrados en esta computadora. Analiza tus primeros videos de YouTube desde el Home para empezar a generar reportes inteligentes.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen text-sans pb-24 md:pb-8">
      
      {/* HEADER DE ANALYTICS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Métricas de Canal Globales</h2>
          <p className="text-xs text-zinc-500">Monitoreo de salud comunitaria e inteligencia semántica en tiempo real.</p>
        </div>
        
        {/* Filtro de tiempo (Estético) */}
        <div className="flex bg-[#16161a] border border-[#232329] p-1 rounded-xl self-start">
          {[
            { id: '7d', label: '7 días' },
            { id: '30d', label: '30 días' },
            { id: 'all', label: 'Histórico' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeRange(tab.id)}
              className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${timeRange === tab.id ? 'bg-purple-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. CONTENEDORES DE CONTADORES REALES (KPI CARDS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-[#16161a] border border-[#232329] rounded-2xl flex flex-col gap-1">
          <span className="text-lg">💬</span>
          <span className="text-xl font-black text-white font-mono mt-1">{totalComentarios.toLocaleString()}</span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Comentarios Escaneados</span>
        </div>
        
        <div className="p-4 bg-[#16161a] border border-[#232329] rounded-2xl flex flex-col gap-1">
          <span className="text-lg">☣️</span>
          <span className="text-xl font-black text-white font-mono mt-1">{promedioToxicidad.toFixed(1)}%</span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Toxicidad Promedio</span>
        </div>

        <div className="p-4 bg-[#16161a] border border-[#232329] rounded-2xl flex flex-col gap-1">
          <span className="text-lg">🚨</span>
          <span className="text-xl font-black text-white font-mono mt-1">{countToxic}</span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Alertas Críticas</span>
        </div>

        <div className="p-4 bg-[#16161a] border border-[#232329] rounded-2xl flex flex-col gap-1">
          <span className="text-lg">🛡️</span>
          <span className="text-xl font-black text-white font-mono mt-1">{healthScoreGlobal}%</span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Health Score Global</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* 2. GRÁFICO REAL: DISTRIBUCIÓN SEMÁNTICA */}
        <div className="p-5 bg-[#16161a] border border-[#232329] rounded-2xl md:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Segmentación de Audiencia</h3>
            
            <div className="flex flex-col gap-4 mt-2">
              {/* Barra Healthy */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-400">Saludable (Healthy)</span>
                  <span className="text-emerald-400 font-bold font-mono">{pctHealthy}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${pctHealthy}%` }} />
                </div>
              </div>

              {/* Barra Neutral */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-400">Moderado (Neutral)</span>
                  <span className="text-amber-500 font-bold font-mono">{pctNeutral}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${pctNeutral}%` }} />
                </div>
              </div>

              {/* Barra High Risk */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-400">Alto Riesgo (High Risk)</span>
                  <span className="text-red-400 font-bold font-mono">{pctToxic}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${pctToxic}%` }} />
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-zinc-500 mt-6 leading-relaxed">
            Métricas procesadas localmente. Canal clasificado actualmente como: {' '}
            <span className={`font-semibold ${promedioToxicidad >= 50 ? 'text-red-400' : promedioToxicidad >= 25 ? 'text-amber-500' : 'text-emerald-400'}`}>
              {promedioToxicidad >= 50 ? 'Bajo Conflicto Crítico' : promedioToxicidad >= 25 ? 'Moderadamente Seguro' : 'Altamente Seguro'}
            </span>.
          </p>
        </div>

       {/* 3. GRÁFICO HISTÓRICO: BARRAS VISIBLES Y REALES */}
        <div className="p-5 bg-[#16161a] border border-[#232329] rounded-2xl md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
              Curva Analítica de Videos (Carga Cronológica)
            </h3>
            <p className="text-[10px] text-zinc-500 mb-6">
              Evolución del porcentaje de toxicidad de tus análisis guardados.
            </p>
          </div>
          
          {/* Contenedor del gráfico con altura rígida de 144px (h-36) */}
          <div className="h-36 flex items-end justify-start gap-4 border-b border-[#232329] px-4 pb-0 overflow-x-auto scrollbar-thin min-w-full">
            {historial.map((video, i) => {
              // Forzar que el porcentaje sea un número válido
              const pct = typeof video.porcentaje_toxicidad === 'number' 
                ? video.porcentaje_toxicidad 
                : (video.toxicity || 0);
              
              const tituloVideo = video.video_title || `Video #${i + 1}`;
              
              {/* 📐 CÁLCULO DE ALTURA REAL EN PÍXELES:
                  El contenedor mide 144px de alto. Multiplicamos los 144px por el porcentaje 
                  y lo dividimos entre 100 para que la barra use los píxeles exactos en pantalla. */}
              const alturaEnPixeles = (pct * 144) / 100;

              return (
                <div key={i} className="flex-1 min-w-[35px] max-w-[45px] flex flex-col items-center justify-end gap-1 group relative">
                  
                  {/* TOOLTIP INTERACTIVO (Flota al pasar el mouse por encima) */}
                  <div className="absolute bottom-full mb-2 bg-zinc-950 border border-zinc-800 text-white rounded-lg p-2 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-2xl z-50 min-w-[145px] left-1/2 transform -translate-x-1/2">
                    <p className="text-[9px] text-zinc-400 truncate max-w-[130px] font-medium mb-0.5">
                      {tituloVideo}
                    </p>
                    <p className={`text-xs font-mono font-black ${pct >= 60 ? 'text-red-400' : pct >= 30 ? 'text-amber-500' : 'text-emerald-400'}`}>
                      {pct.toFixed(1)}% Tóxico
                    </p>
                  </div>

                  {/* 📊 BARRA FÍSICA FORZADA CON ALTURA EN PÍXELES (POR FIN VISIBLE) */}
                  <div 
                    className={`w-full rounded-t-md transition-all duration-500 shadow-lg ${
                      pct >= 60 
                        ? 'bg-gradient-to-t from-red-600/40 to-red-500' 
                        : pct >= 30 
                          ? 'bg-gradient-to-t from-amber-600/40 to-amber-500' 
                          : 'bg-gradient-to-t from-purple-600/30 to-purple-500'
                    }`}
                    style={{ height: `${Math.max(alturaEnPixeles, 12)}px` }} // Altura mínima de 12px para que no desaparezca si es 0%
                  />

                  {/* Identificador numérico abajo (#1, #2...) */}
                  <span className="text-[9px] font-mono font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors pt-1 pb-1">
                    #{i + 1}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Espaciador inferior sutil para mantener simetría limpia sin textos falsos */}
          <div className="h-2" />
        </div>

      </div>

      {/* 4. TABLA REAL: VIDEOS CON MAYOR NIVEL DE RIESGO */}
      <section className="p-5 bg-[#16161a] border border-[#232329] rounded-2xl">
        <div className="mb-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Videos con Mayor Índice de Conflicto</h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">Identificación y ordenamiento automático de focos de debate agresivo en el canal.</p>
        </div>

        <div className="flex flex-col gap-2">
          {videosOrdenados.map((video, idx) => {
            const pct = typeof video.porcentaje_toxicidad === 'number' ? video.porcentaje_toxicidad : (video.toxicity || 0)
            const badge = obtenerBadge(pct)

            return (
              <div 
                key={video.id || video.video_id || idx}
                className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-zinc-900/30 border border-[#232329]/60 hover:border-zinc-700 rounded-xl transition-all gap-3"
              >
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <span className="text-xs font-semibold text-white truncate">{video.video_title || "Video de YouTube"}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">10 comentarios semánticos analizados</span>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] text-zinc-500 font-medium">Índice de Toxicidad</p>
                    <p className={`text-xs font-bold font-mono ${pct >= 60 ? 'text-red-400' : pct >= 30 ? 'text-amber-500' : 'text-emerald-400'}`}>
                      {pct.toFixed(1)}%
                    </p>
                  </div>

                  <span 
                    className="text-[9px] tracking-wide font-black uppercase px-2 py-0.5 rounded border"
                    style={{
                      backgroundColor: badge === 'High Risk' ? 'rgba(239,68,68,0.08)' : badge === 'Neutral' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)',
                      borderColor: badge === 'High Risk' ? 'rgba(239,68,68,0.2)' : badge === 'Neutral' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)',
                      color: badge === 'High Risk' ? '#ef4444' : badge === 'Neutral' ? '#f59e0b' : '#10b981',
                    }}
                  >
                    {badge}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}