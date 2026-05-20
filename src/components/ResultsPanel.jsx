import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

// ─── HELPERS ────────────────────────────────────────────────────────────────

function getToxColor(pct) {
  if (pct >= 60) return '#ef4444'
  if (pct >= 30) return '#f59e0b'
  return '#10b981'
}

function getToxBg(pct) {
  if (pct >= 60) return 'rgba(239,68,68,0.1)'
  if (pct >= 30) return 'rgba(245,158,11,0.1)'
  return 'rgba(16,185,129,0.1)'
}

function getRiskLabel(pct) {
  if (pct >= 60) return 'High Risk'
  if (pct >= 30) return 'Neutral'
  return 'Healthy'
}

// ─── GAUGE CIRCULAR ─────────────────────────────────────────────────────────

function GaugeChart({ value }) {
  const color = getToxColor(value)
  const r = 72
  const cx = 90
  const cy = 90
  const circ = 2 * Math.PI * r
  const filled = (value / 100) * circ
  const empty = circ - filled

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#232329" strokeWidth="14" />
        {/* Fill */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeDasharray={`${filled} ${empty}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          filter="url(#glow)"
          style={{ transition: 'stroke-dasharray 1.2s ease, stroke 0.5s ease' }}
        />
        {/* Valor central */}
        <text x={cx} y={cy - 8} textAnchor="middle" fill={color} fontSize="26" fontWeight="700" fontFamily="monospace">
          {value.toFixed(1)}%
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#6b7280" fontSize="11" fontFamily="sans-serif">
          Toxicidad global
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fill={color} fontSize="11" fontFamily="sans-serif" fontWeight="600">
          {getRiskLabel(value)}
        </text>
      </svg>
    </div>
  )
}

// ─── TARJETA DE MÉTRICA ──────────────────────────────────────────────────────

function MetricCard({ label, value, color, icon }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl p-5 border border-[#232329] bg-[#16161a]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{label}</span>
        <span className="text-lg">{icon}</span>
      </div>
      <span className="text-3xl font-black font-mono" style={{ color: color || '#f9fafb' }}>
        {value}
      </span>
    </div>
  )
}

// ─── BADGE POR ETIQUETA ──────────────────────────────────────────────────────

function EtiquetaBadge({ etiqueta, esToxico }) {
  if (!esToxico) {
    return (
      <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg bg-[#10b98115] text-[#10b981] border border-[#10b98133]">
        Safe
      </span>
    )
  }
  // El modelo devuelve NEGATIVE como tóxico
  return (
    <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg bg-[#ef444415] text-[#ef4444] border border-[#ef444433]">
      {etiqueta || 'Toxic'}
    </span>
  )
}

// ─── TOOLTIP CUSTOMIZADO ─────────────────────────────────────────────────────

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-sm">
      <span className="text-white font-bold">{payload[0].name}:</span>{' '}
      <span style={{ color: payload[0].payload.color }}>{payload[0].value} comentarios</span>
    </div>
  )
}

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────────────────

export default function ResultsPanel({ data }) {
  if (!data) return null

  const { video_id, comentarios_totales, comentarios_toxicos, porcentaje_toxicidad, detalle } = data
  const comentariosSeguros = comentarios_totales - comentarios_toxicos

  const pieData = [
    { name: 'Tóxicos',  value: comentarios_toxicos,  color: '#ef4444' },
    { name: 'Seguros',  value: comentariosSeguros,    color: '#10b981' },
  ]

  // Ordenamos detalle: primero los más tóxicos por score_confianza
  const comentariosOrdenados = [...(detalle || [])].sort(
    (a, b) => b.evaluacion.score_confianza - a.evaluacion.score_confianza
  )

  const toxColor = getToxColor(porcentaje_toxicidad)
  const toxBg    = getToxBg(porcentaje_toxicidad)

  return (
    <div className="mt-8 flex flex-col gap-6">

      {/* ── ALERTA si toxicidad > 60% ── */}
      {porcentaje_toxicidad >= 60 && (
        <div
          className="flex items-start gap-4 rounded-2xl px-6 py-4 border animate-pulse"
          style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.3)' }}
        >
          <span className="text-2xl mt-0.5">⚠️</span>
          <div>
            <p className="text-[#ef4444] font-bold text-sm">Alerta de toxicidad alta</p>
            <p className="text-zinc-400 text-xs mt-0.5">
              Este video supera el 60% de toxicidad. Contenido potencialmente dañino detectado en la comunidad.
            </p>
          </div>
        </div>
      )}

      {/* ── HEADER: video_id + gauge ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl p-6 border border-[#232329] bg-[#16161a]">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Video analizado</span>
          <h3 className="text-white font-bold text-lg font-mono">
            📹 {video_id}
          </h3>
          <span
            className="self-start text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-lg mt-1"
            style={{ background: toxBg, color: toxColor }}
          >
            {getRiskLabel(porcentaje_toxicidad)}
          </span>
        </div>
        <GaugeChart value={porcentaje_toxicidad} />
      </div>

      {/* ── MÉTRICAS ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard
          label="Total comentarios"
          value={comentarios_totales}
          color="#f9fafb"
          icon="💬"
        />
        <MetricCard
          label="Comentarios tóxicos"
          value={comentarios_toxicos}
          color="#ef4444"
          icon="☣️"
        />
        <MetricCard
          label="Comentarios seguros"
          value={comentariosSeguros}
          color="#10b981"
          icon="✅"
        />
      </div>

      {/* ── TABLA + PIE CHART ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Tabla de comentarios */}
        <div className="md:col-span-2 rounded-2xl border border-[#232329] bg-[#16161a] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#232329]">
            <span className="text-white font-bold text-sm">Comentarios analizados</span>
            <span className="text-xs text-zinc-500">Ordenados por toxicidad</span>
          </div>

          <div className="flex flex-col divide-y divide-[#232329]">
            {comentariosOrdenados.map((item, i) => {
              const { autor, texto, evaluacion } = item
              const pct = Math.round(evaluacion.score_confianza * 100)
              const color = evaluacion.es_toxico ? '#ef4444' : '#10b981'

              return (
                <div
                  key={i}
                  className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-zinc-900/40"
                  style={{ borderLeft: `3px solid ${color}` }}
                >
                  {/* Número */}
                  <span className="text-xs font-mono text-zinc-600 mt-0.5 min-w-[18px]">
                    {i + 1}
                  </span>

                  {/* Texto + autor + badge */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-200 leading-relaxed line-clamp-2">{texto}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-zinc-500">@{autor}</span>
                      <EtiquetaBadge
                        etiqueta={evaluacion.etiqueta_modelo}
                        esToxico={evaluacion.es_toxico}
                      />
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex flex-col items-end shrink-0">
                    <span
                      className="text-base font-black font-mono"
                      style={{ color }}
                    >
                      {pct}%
                    </span>
                    <span className="text-[10px] text-zinc-600">confianza</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pie chart */}
        <div className="rounded-2xl border border-[#232329] bg-[#16161a] p-6 flex flex-col gap-4">
          <span className="text-white font-bold text-sm">Distribución</span>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Leyenda */}
          <div className="flex flex-col gap-2 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-zinc-400">{d.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{d.value}</span>
              </div>
            ))}
            <div className="border-t border-[#232329] pt-2 mt-1 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Toxicidad global</span>
              <span className="text-xs font-black font-mono" style={{ color: toxColor }}>
                {porcentaje_toxicidad.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}