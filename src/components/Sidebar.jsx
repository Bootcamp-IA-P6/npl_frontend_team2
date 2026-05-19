export default function Sidebar() {
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
        <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#cfc2d7] hover:bg-[#353438]/50 transition-colors" href="#">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label text-sm">Home</span>
        </a>
        
        {/* Item Activo */}
        <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#9333ea]/20 text-[#ddb8ff] border border-[#9333ea]/20 active-glow transition-all" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
          <span className="font-label text-sm font-bold">Analyze</span>
        </a>

        <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#cfc2d7] hover:bg-[#353438]/50 transition-colors" href="#">
          <span className="material-symbols-outlined">query_stats</span>
          <span className="font-label text-sm">Analytics</span>
        </a>

        <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#cfc2d7] hover:bg-[#353438]/50 transition-colors" href="#">
          <span className="material-symbols-outlined">history</span>
          <span className="font-label text-sm">History</span>
        </a>

        <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#cfc2d7] hover:bg-[#353438]/50 transition-colors" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label text-sm">Settings</span>
        </a>
      </nav>

      {/* Perfil de Usuario abajo */}
    
    </aside>
  )
}