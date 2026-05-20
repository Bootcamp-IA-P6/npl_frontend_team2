export default function RecentCard({ title, time, toxicity, badge, image, mobile = false }) {
  
  // Mapeo de estilos dinámicos para los badges de riesgo exactos del prototipo
  const badgeStyles = {
    'High Risk': 'bg-[#ef444415] text-[#ef4444] border border-[#ef444433]',
    'Healthy': 'bg-[#10b98115] text-[#10b981] border border-[#10b98133]',
    'Neutral': 'bg-[#f59e0b15] text-[#f59e0b] border border-[#f59e0b33]',
    'SAFE': 'bg-[#10b98115] text-[#10b981] border border-[#10b98133]',
    'TOXIC': 'bg-[#ef444415] text-[#ef4444] border border-[#ef444433]',
  }

  const badgeClass = badgeStyles[badge] || 'bg-zinc-800 text-zinc-400'

  // Iconos de tendencia con flechas estilizadas de color según toxicidad
  const trendIcon = toxicity > 50 ? (
    <span className="text-red-400 font-bold text-sm transform rotate-45">↗</span>
  ) : toxicity < 20 ? (
    <span className="text-emerald-400 font-bold text-sm transform rotate-45">↘</span>
  ) : (
    <span className="text-amber-400 font-bold text-sm">—</span>
  )

  // --- MÓVIL ---
  if (mobile) {
    return (
      <div className="flex items-center gap-4 py-3 border-b border-[#232329] hover:bg-zinc-900/40 px-2 transition-colors duration-200">
        <div
          className="w-12 h-10 rounded-xl shrink-0 border border-[#232329]"
          style={{
            background: image || 'linear-gradient(135deg, #7c3aed33, #16161a)',
          }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{title}</p>
          <p className="text-xs mt-0.5 text-gray-500">{time}</p>
        </div>
        <span className={`text-[10px] tracking-wide font-bold px-2.5 py-1 rounded-md shrink-0 uppercase ${badgeClass}`}>
          {badge}
        </span>
      </div>
    )
  }

  // --- ESCRITORIO (TARJETAS MÁS PEQUEÑAS REESTILIZADAS) ---
  return (
    <div className="rounded-xl overflow-hidden bg-[#16161a] border border-[#232329] hover:border-zinc-700/80 transition-all duration-300 flex flex-col group shadow-lg">
      
      {/* 📐 Altura reducida de h-36 a h-20 para hacer la tarjeta más pequeña */}
      <div
        className="h-20 w-full relative transition-transform duration-500 group-hover:scale-[1.01]"
        style={{
          background: image || 'linear-gradient(135deg, #1e1b4b, #090514)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] to-transparent opacity-70" />
      </div>

      {/* Contenido ajustado con menos padding (p-4) */}
      <div className="p-4 flex flex-col gap-2 flex-1 bg-[#16161a]">
        
        {/* Badge dinámico */}
        <span className={`text-[9px] tracking-wide font-bold px-1.5 py-0.5 rounded self-start ${badgeClass}`}>
          {badge}
        </span>
        
        {/* Título de la tarjeta (Compactado) */}
        <h3 className="text-xs font-bold text-white leading-tight tracking-wide line-clamp-1">
          {title}
        </h3>
        
        {/* Tiempo transcurrido */}
        <p className="text-[11px] text-gray-500">Analyzed {time}</p>
        
        {/* Divisor inferior y fila de métricas */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#232329]/60">
          <span className="text-[11px] font-medium text-gray-400">
            Toxicity: <span className="text-white font-bold ml-1">{toxicity}%</span>
          </span>
          <div className="flex items-center justify-center w-4 h-4 bg-zinc-900/60 rounded-full border border-zinc-800/40">
            {trendIcon}
          </div>
        </div>

      </div>
    </div>
  )
}