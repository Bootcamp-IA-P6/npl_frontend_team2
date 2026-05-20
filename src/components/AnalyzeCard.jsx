import { useState } from 'react'
import { analizarContenido } from '../services/toxicityApi'


// 1. Recibimos la función a través de las props del componente
export default function AnalyzeCard({ onAnalysisComplete }) {
  const [inputUrl, setInputUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAnalysis = async () => {
    if (!inputUrl) return alert('Please enter a YouTube URL first')

    setLoading(true)
    try {
      // Llamamos al servicio que habla con Go
      const data = await analizarContenido(inputUrl)
      
      console.log("Respuesta de la IA:", data)
      
      // Pasamos el nuevo JSON al componente padre para que pinte las gráficas o resultados
      if (onAnalysisComplete) {
        onAnalysisComplete(data)
      }

      // Limpiamos el cuadro de texto para la siguiente consulta
      setInputUrl('')

    } catch (error) {
      alert('Something went wrong with the Backend. Check the console.');
    } finally {
      setLoading(false)
    }
  }

 
  return (
    <section className="relative group w-full">
      {/* Efecto de resplandor trasero */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
      
      {/* Tarjeta real */}
      <div className="relative bg-zinc-900 border border-zinc-800 p-10 rounded-2xl">
        <h2 className="font-headline text-2xl font-bold mb-4 text-white">Sentiment & Toxicity Check</h2>
        <p className="text-[#cfc2d7] mb-8 text-base">
          Paste any social media thread or website URL to analyze toxicity levels, sentiment bias, and potential community risk.
        </p>
        
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">link</span>
            <input 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-4 py-4 text-[#e4e1e6] focus:ring-2 focus:ring-[#9333ea] focus:border-transparent transition-all outline-none" 
              placeholder="https://twitter.com/thread/..." 
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              disabled={loading}
            />
          </div>
          <button 
            onClick={handleAnalysis}
            disabled={loading}
            className={`bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl font-bold text-white shadow-purple-500/30 shadow-lg active:scale-95 transition-all whitespace-nowrap ${loading ? 'opacity-50 cursor-not-allowed animate-pulse' : 'cursor-pointer'}`}
          >
            {loading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
      </div>
    </section>
  )
}