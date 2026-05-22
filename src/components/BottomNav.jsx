import { Home, Search, Activity, User } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Home' },
  { icon: Search, label: 'Analyze', active: true }, // Lo puse activo en Analyze para hacer match con tu prototipo
  { icon: Activity, label: 'Analytics' },
  { icon: User, label: 'Settings' },
]

export default function BottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around px-4 py-3 z-50 bg-[#16161a] border-t border-[#232329] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
    >
      {navItems.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          className={`flex flex-col items-center gap-1.5 text-[10px] tracking-wide font-semibold transition-all duration-200 ${
            active 
              ? 'text-[#a78bfa] drop-shadow-[0_0_8px_rgba(124,58,237,0.6)] scale-105' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Icon size={20} className={active ? 'stroke-[2.5px]' : 'stroke-[2px]'} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}