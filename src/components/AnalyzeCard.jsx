import { useState } from 'react'
import { analizarContenido } from '../services/toxicityApi'

export default function AnalyzeCard({ onAnalysisComplete }) {
  const [inputUrl, setInputUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAnalysis = async () => {
    if (!inputUrl) return alert('Por favor, introduce una URL de YouTube primero')

    setLoading(true)
    try {
      const data = await analizarContenido(inputUrl)
      console.log("Respuesta de la IA:", data)
      if (onAnalysisComplete) {
        onAnalysisComplete(data)
      }
      setInputUrl('')
    } catch (error) {
      alert('Algo salió mal con el backend. Revisa la consola.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative group w-full">
      {/* Resplandor trasero */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />

      {/* Tarjeta */}
      <div className="relative bg-zinc-900 border border-zinc-800 p-8 md:p-10 rounded-2xl">

        {/* Cabecera */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>youtube_activity</span>
          </div>
          <div>
            <h2 className="font-headline text-xl md:text-2xl font-bold text-white leading-tight">
              Análisis de Toxicidad
            </h2>
            <p className="text-[#9b8aaa] text-sm mt-1">
              Powered by DistilBERT · Modelo de lenguaje entrenado para detectar toxicidad
            </p>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-[#cfc2d7] text-sm mb-8 leading-relaxed border-l-2 border-purple-700 pl-4">
          Pega la URL de cualquier video de YouTube para analizar sus comentarios con inteligencia artificial.
          El modelo clasifica cada comentario como <span className="text-red-400 font-semibold">tóxico</span> o{' '}
          <span className="text-emerald-400 font-semibold">seguro</span> y calcula el nivel de riesgo general del video.
        </p>

        {/* Input + botón */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-[20px]">
              link
            </span>
            <input
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-4 py-4 text-[#e4e1e6] placeholder-zinc-600 focus:ring-2 focus:ring-[#9333ea] focus:border-transparent transition-all outline-none text-sm"
              placeholder="https://www.youtube.com/watch?v=..."
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalysis()}
            />
          </div>
          <button
            onClick={handleAnalysis}
            disabled={loading || !inputUrl.trim()}
            className={`bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl font-bold text-white shadow-purple-500/30 shadow-lg active:scale-95 transition-all whitespace-nowrap text-sm
              ${loading || !inputUrl.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}
              ${loading ? 'animate-pulse' : ''}`}
          >
            {loading
              ? <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  Analizando...
                </span>
              : <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">search</span>
                  Analizar video
                </span>
            }
          </button>
        </div>

        {/* Hint */}
        <p className="text-zinc-600 text-xs mt-4 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">info</span>
          Analiza los 10 primeros comentarios del video · Pulsa Enter o el botón para comenzar
        </p>
      </div>
    </section>
  )
}