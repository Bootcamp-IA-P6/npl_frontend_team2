export default function Sidebar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home',      label: 'Home',      icon: 'home' },
    { id: 'analytics', label: 'Analytics', icon: 'query_stats' },
    { id: 'history',   label: 'History',   icon: 'history' },
    { id: 'settings',  label: 'Settings',  icon: 'settings' },
  ]

  return (
    <aside className="w-[240px] bg-zinc-900 border-r border-zinc-800 flex flex-col p-6 h-full shrink-0 select-none">
      {/* Logo */}
      <div className="mb-10">
        <span className="font-headline text-2xl font-black bg-gradient-to-r from-[#ddb8ff] to-[#b4c5ff] bg-clip-text text-transparent tracking-tight">
          VIBE
        </span>
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left
                ${isActive
                  ? 'bg-[#9333ea]/20 text-[#ddb8ff] border border-[#9333ea]/20'
                  : 'text-[#cfc2d7] hover:bg-[#353438]/50 border border-transparent'
                }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className={`font-label text-sm ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {/* Indicador activo */}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}