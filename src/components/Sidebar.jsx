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
      <div className="mt-auto p-4 glass rounded-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#9333ea]/30">
          <img alt="User Profile" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
        </div>
        <div>
          <p className="font-label text-sm font-bold text-[#e4e1e6]">Alex Rivera</p>
          <p className="text-[10px] text-[#cfc2d7] font-bold tracking-wider">PRO ACCOUNT</p>
        </div>
      </div>
    </aside>
  )
}