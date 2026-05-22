import { useState } from 'react'

export default function Settings() {
  const [language, setLanguage] = useState('es')
  const [notifications, setNotifications] = useState(true)
  const [toxicityThreshold, setToxicityThreshold] = useState(60)
  const [successMessage, setSuccessMessage] = useState('')

  // Lógica para borrar historial
  const handleClearHistory = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todo tu historial?')) {
      localStorage.removeItem('historial_videos')
      setSuccessMessage('¡Historial borrado con éxito!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen text-sans pb-24 md:pb-8">
      
      {/* 1. SECCIÓN DE PLANES DE SUSCRIPCIÓN (Estilo SaaS / Claude) */}
      <div className="mb-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white mb-2">Planes de Suscripción</h2>
          <p className="text-xs text-zinc-500">Escala tu moderación de contenidos con potencia de IA dedicada.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Plan Standard (Gratis) - MODIFICADO CON HOVER MORADO */}
          <div className="p-6 bg-[#16161a] border border-[#232329] rounded-3xl flex flex-col relative overflow-hidden group hover:border-purple-600/60 transition-all duration-300 shadow-[0_0_40px_-15px_rgba(35,35,41,0.3)] hover:shadow-[0_0_40px_-15px_rgba(147,51,234,0.3)] cursor-pointer">
            
            {/* Overlay sutil de luz púrpura al hover */}
            <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/[0.03] transition-colors duration-300" />

            <div className="mb-6 relative">
              <span className="text-[10px] font-black text-zinc-500 group-hover:text-purple-400 transition-colors uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-[#232329] group-hover:border-purple-500/30">Free</span>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$0</span>
                <span className="text-xs text-zinc-500">/ mes</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">Para creadores que están empezando.</p>
            </div>
            
            <ul className="flex flex-col gap-3 mb-8 flex-1 relative">
              {['10 análisis por video', 'Historial local', 'Modelo DistilBERT estándar', 'Soporte por comunidad'].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-[11px] text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  <span className="text-emerald-500">✓</span> {feature}
                </li>
              ))}
            </ul>

            <button className="w-full py-3 bg-zinc-900 text-zinc-400 text-xs font-bold rounded-xl border border-[#232329] cursor-default relative group-hover:border-purple-500/20 group-hover:bg-purple-600/5 group-hover:text-purple-300 transition-all">
              Plan Actual
            </button>
          </div>

          {/* Plan Pro / Enterprise (Premium) - Sigue igual con su glow permanente */}
          <div className="p-6 bg-[#16161a] border-2 border-purple-600/70 rounded-3xl flex flex-col relative overflow-hidden shadow-[0_0_50px_-10px_rgba(147,51,234,0.4)] group hover:border-purple-500 transition-all duration-300 cursor-pointer">
            
            {/* Badge de Popular */}
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-[9px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-tighter shadow-lg">
              Recomendado
            </div>

            <div className="mb-6">
              <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">Pro Enterprise</span>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">$29</span>
                <span className="text-xs text-zinc-500">/ mes</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">Potencia total para agencias y marcas.</p>
            </div>
            
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {[
                'Análisis de comentarios ilimitados',
                'Exportación de reportes PDF/CSV',
                'IA de prioridad (0.5s de respuesta)',
                'Soporte técnico 24/7 dedicado',
                'API Key para integración propia'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-[11px] text-white">
                  <span className="text-purple-500">✓</span> {feature}
                </li>
              ))}
            </ul>

            <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-purple-900/20">
              Mejorar ahora
            </button>
          </div>

        </div>
      </div>


      {/* 2. REGISTRO DE DATOS DEL CLIENTE - Sigue igual */}
      <section className="mb-10 p-6 bg-[#16161a] border border-[#232329] rounded-3xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl">👤</span>
          <div>
            <h3 className="text-sm font-bold text-white">Detalles del Perfil</h3>
            <p className="text-[10px] text-zinc-500 font-mono">ID de Cliente: VIBE-88291-TX</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Nombre Completo</label>
            <input type="text" placeholder="Ej: Juan Pérez" className="bg-zinc-900/50 border border-[#232329] p-3 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Correo Electrónico</label>
            <input type="email" placeholder="usuario@empresa.com" className="bg-zinc-900/50 border border-[#232329] p-3 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
          </div>
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-[10px] uppercase font-black text-zinc-500 ml-1">Organización / Empresa</label>
            <input type="text" placeholder="Nombre de tu marca" className="bg-zinc-900/50 border border-[#232329] p-3 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500" />
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-[#232329] flex justify-end">
           <button className="px-6 py-2 bg-white text-black text-xs font-bold rounded-xl hover:bg-zinc-200 transition-colors shadow-md">
              Guardar Cambios
           </button>
        </div>
      </section>


      {/* 3. CONFIGURACIÓN DEL SISTEMA - Sigue igual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Preferencias */}
        <div className="p-6 bg-[#16161a] border border-[#232329] rounded-3xl flex flex-col gap-5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Sistema</h3>
          
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Notificaciones de escritorio</span>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-9 h-5 rounded-full p-1 transition-colors ${notifications ? 'bg-purple-600' : 'bg-zinc-800'}`}
            >
              <div className={`w-3 h-3 bg-white rounded-full transition-transform ${notifications ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Umbral de Alerta ({toxicityThreshold}%)</span>
            <input 
              type="range" min="40" max="80" value={toxicityThreshold}
              onChange={(e) => setToxicityThreshold(Number(e.target.value))}
              className="w-24 accent-purple-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Seguridad */}
        <div className="p-6 bg-[#16161a] border border-[#232329] rounded-3xl flex flex-col gap-5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Privacidad</h3>
          <p className="text-[10px] text-zinc-500 leading-relaxed">
            Tus datos se almacenan localmente. Al borrar el historial, eliminas permanentemente todos los registros de análisis de este dispositivo.
          </p>
          <button 
            onClick={handleClearHistory}
            className="text-[10px] font-bold text-red-400 hover:text-red-300 transition-colors self-start"
          >
            🗑️ Vaciar todos los datos locales
          </button>
        </div>

      </div>

      {/* Footer de éxito */}
      {successMessage && (
        <div className="fixed bottom-10 right-10 bg-emerald-600 text-white text-[10px] font-bold px-5 py-2.5 rounded-full shadow-lg shadow-emerald-950/30 animate-bounce">
          {successMessage}
        </div>
      )}

    </div>
  )
}