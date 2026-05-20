import { useState } from 'react'
import AnalyzeCard from '../components/AnalyzeCard'
import RecentCard from '../components/RecentCard'
import ResultsPanel from '../components/ResultsPanel'

const initialRecentAnalyses = [
  {
    id: 1,
    title: 'Reddit r/gaming-thread-012',
    time: '2h ago',
    toxicity: 78,
    badge: 'High Risk',
    image: 'linear-gradient(135deg, #4a0080, #1a0030)',
  },
  {
    id: 2,
    title: 'TechCrunch Article Comments',
    time: '5h ago',
    toxicity: 12,
    badge: 'Healthy',
    image: 'linear-gradient(135deg, #003020, #001a10)',
  },
  {
    id: 3,
    title: 'Discord Community Alpha',
    time: '8h ago',
    toxicity: 34,
    badge: 'Neutral',
    image: 'linear-gradient(135deg, #2d0050, #100020)',
  },
]

export default function Home() {
  const [analyses, setAnalyses] = useState(initialRecentAnalyses)
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleNewAnalysis = (apiData) => {
    // Guardamos el resultado completo para pintar el ResultsPanel
    setAnalysisResult(apiData)

    // Calculamos el badge con 3 niveles correctos
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

    const nuevoAnalisis = {
      id: Date.now(),
      title: `YouTube Video: ${apiData.video_id}`,
      time: 'Just now',
      toxicity: Math.round(apiData.porcentaje_toxicidad),
      badge: getBadge(apiData.porcentaje_toxicidad),
      image: getImage(apiData.porcentaje_toxicidad),
    }

    setAnalyses((prevAnalyses) => [nuevoAnalisis, ...prevAnalyses])
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Desktop header */}
      <header
        className="hidden md:flex items-center justify-between px-8 py-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <h1 className="text-lg font-bold text-white tracking-wide">Analyze New URL</h1>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <span className="text-white text-base">🔔</span>
        </button>
      </header>

      {/* Mobile header */}
      <header
        className="md:hidden flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <button className="text-white">
          <span className="text-xl">☰</span>
        </button>
        <span
          className="logo text-xl font-extrabold tracking-widest"
          style={{ color: 'var(--accent-purple-light)' }}
        >
          VIBE
        </span>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <span className="text-white text-base">🔔</span>
        </button>
      </header>

      {/* Main content */}
      <main className="px-5 md:px-8 pt-6 pb-24 md:pb-8">
        <AnalyzeCard onAnalysisComplete={handleNewAnalysis} />

        {/* ResultsPanel — solo aparece cuando hay datos reales de la API */}
        {analysisResult && <ResultsPanel data={analysisResult} />}

        {/* Recent Analyses — se oculta mientras se muestran resultados para no saturar */}
        {!analysisResult && (
          <>
            <div className="flex items-center justify-between mb-5 mt-8">
              <h2 className="text-base font-bold text-white">Recent Analyses</h2>
              <button
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--accent-purple-light)' }}
              >
                View All →
              </button>
            </div>

            {/* Desktop grid */}
            <div className="hidden md:grid grid-cols-3 gap-4">
              {analyses.map((item) => (
                <RecentCard key={item.id} {...item} />
              ))}
            </div>

            {/* Mobile list */}
            <div className="md:hidden flex flex-col gap-4">
              {analyses.map((item) => (
                <RecentCard key={item.id} {...item} mobile />
              ))}
            </div>
          </>
        )}

        {/* Botón para volver al historial desde los resultados */}
        {analysisResult && (
          <button
            onClick={() => setAnalysisResult(null)}
            className="mt-8 flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Volver al historial</span>
          </button>
        )}
      </main>
    </div>
  )
}