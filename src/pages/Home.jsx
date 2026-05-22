import { useState } from 'react'
import AnalyzeCard from '../components/AnalyzeCard'
import RecentCard from '../components/RecentCard'
import ResultsPanel from '../components/ResultsPanel'

const STATS = [
  { icon: '🧠', label: 'Modelo', value: 'DistilBERT' },
  { icon: '💬', label: 'Comentarios por análisis', value: '10' },
  { icon: '⚡', label: 'Tiempo medio', value: '~5s' },
  { icon: '🎯', label: 'Precisión del modelo', value: '94%' },
]

const FEATURES = [
  {
    icon: '🔍',
    title: 'Detección automática',
    desc: 'El modelo analiza cada comentario individualmente y lo clasifica como tóxico o seguro.',
  },
  {
    icon: '📊',
    title: 'Métricas en tiempo real',
    desc: 'Obtén el porcentaje de toxicidad global, nivel de riesgo y confianza por comentario.',
  },
  {
    icon: '🛡️',
    title: 'Niveles de riesgo',
    desc: 'Clasificación en tres niveles: Saludable (0–30%), Neutral (30–60%) y Alto Riesgo (>60%).',
  },
]

export default function Home() {
  // CONFIGURACIÓN SEGURA PARA LOCALSTORAGE (Anti-errores de Vercel)
  const [analyses, setAnalyses] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('historial_videos')) || []
    }
    return []
  })
  
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleNewAnalysis = (apiData) => {
    setAnalysisResult(apiData)

    const getBadge = (pct) => {
      if (pct >= 60) return 'High Risk'
      if (pct >= 30) return 'Neutral'
      return 'Healthy'
    }

    const getImage = (pct) => {
      if (pct >= 60) return 'linear-gradient(135deg, #cc0000, #4a0000)'
      if (pct >= 30) return 'linear-gradient(135deg, #92400e, #2d1200)'
      return 'linear-gradient(135deg, #003020, #001a10)'
    }

    // 📹 Reconstruimos la URL completa usando el ID que nos da el Backend
    const urlCompleta = `https://www.youtube.com/watch?v=${apiData.video_id}`

    const nuevoAnalisis = {
      id: Date.now(),
      video_id: apiData.video_id,
      video_url: urlCompleta, // 👈 Se guarda la URL completa aquí
      video_title: `Video YouTube (${apiData.video_id})`, 
      title: `YouTube · ${apiData.video_id}`,
      time: 'Ahora mismo',
      toxicity: Math.round(apiData.porcentaje_toxicidad),
      porcentaje_toxicidad: apiData.porcentaje_toxicidad, 
      badge: getBadge(apiData.porcentaje_toxicidad),
      image: getImage(apiData.porcentaje_toxicidad),
    }

    // GUARDADO EN LOCALSTORAGE
    setAnalyses((prev) => {
      const filtrado = prev.filter(v => v.video_id !== nuevoAnalisis.video_id)
      const listaActualizada = [nuevoAnalisis, ...filtrado]
      
      localStorage.setItem('historial_videos', JSON.stringify(listaActualizada))
      return listaActualizada
    })
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

      {/* Header escritorio */}
      <header
        className="hidden md:flex items-center justify-between px-8 py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <h1 className="text-lg font-bold text-white tracking-wide">Analizar nuevo video</h1>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <span className="text-white text-base">🔔</span>
        </button>
      </header>

      {/* Header móvil */}
      <header
        className="md:hidden flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <button className="text-white">
          <span className="text-xl">☰</span>
        </button>
        <span className="logo text-xl font-extrabold tracking-widest" style={{ color: 'var(--accent-purple-light)' }}>
          VIBE
        </span>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <span className="text-white text-base">🔔</span>
        </button>
      </header>

      {/* Contenido principal */}
      <main className="px-5 md:px-8 pt-6 pb-24 md:pb-8">

        {/* AnalyzeCard */}
        <AnalyzeCard onAnalysisComplete={handleNewAnalysis} />

        {/* RESULTADOS */}
        {analysisResult && (
          <>
            <ResultsPanel data={analysisResult} />
            <button
              onClick={() => setAnalysisResult(null)}
              className="mt-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Volver al inicio
            </button>
          </>
        )}

        {/* PANEL DE BIENVENIDA */}
        {!analysisResult && (
          <>
            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1 rounded-2xl p-4 border border-[#232329] bg-[#16161a]"
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-lg font-black text-white font-mono">{s.value}</span>
                  <span className="text-xs text-zinc-500">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Descripción del modelo */}
            <div className="mt-6 rounded-2xl border border-[#232329] bg-[#16161a] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-600/30 flex items-center justify-center">
                  <span className="text-purple-400 text-sm">✦</span>
                </div>
                <h2 className="text-white font-bold text-base">¿Cómo funciona VIBE?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="flex flex-col gap-3 p-5 rounded-xl bg-zinc-900/60 border border-[#232329]"
                  >
                    <span className="text-2xl">{f.icon}</span>
                    <h3 className="text-white font-semibold text-sm">{f.title}</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Pasos */}
              <div className="mt-6 pt-6 border-t border-[#232329]">
                <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">
                  Cómo usarlo
                </p>
                <div className="flex flex-col md:flex-row gap-3">
                  {[
                    { step: '01', text: 'Copia la URL del video de YouTube que quieras analizar' },
                    { step: '02', text: 'Pégala en el campo de arriba y pulsa "Analizar video"' },
                    { step: '03', text: 'Revisa las métricas, la tabla de comentarios y el nivel de riesgo' },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3 flex-1">
                      <span className="text-xs font-black font-mono text-purple-500 mt-0.5 shrink-0">{s.step}</span>
                      <p className="text-zinc-400 text-xs leading-relaxed">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Historial de análisis recientes */}
            {analyses.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-5 mt-8">
                  <h2 className="text-base font-bold text-white">Análisis recientes</h2>
                  <span className="text-xs text-zinc-500">{analyses.length} analizados</span>
                </div>
                <div className="hidden md:grid grid-cols-3 gap-4">
                  {analyses.map((item) => (
                    <RecentCard key={item.id} {...item} />
                  ))}
                </div>
                <div className="md:hidden flex flex-col gap-4">
                  {analyses.map((item) => (
                    <RecentCard key={item.id} {...item} mobile />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}