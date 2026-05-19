import Sidebar from './components/Sidebar'
import Home from './pages/Home'

export default function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#131316]">
      {/* 1. Sidebar Fijo a la izquierda */}
      <Sidebar />

      {/* 2. Área de Contenido derecho */}
      <div className="flex-1 h-full overflow-y-auto bg-black flex flex-col">
        <Home />
      </div>
    </div>
  )
}