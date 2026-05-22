import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
// ✅ Importamos las funciones listas desde el servicio (añadí la instancia de supabase por si acaso)
import { obtenerHistorialGlobal, eliminarAnalisisVideo, supabase } from './services/toxicityApi'
import Home from './pages/Home'
import Analytics from './pages/Analytics'
import History from './pages/History'
import Settings from './pages/Settings'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [historialVideos, setHistorialVideos] = useState([])
  const [loading, setLoading] = useState(false)

  // 1. Función para traer los datos limpios que procesa tu servicio
  const cargarDatosDesdeSupabase = async () => {
    setLoading(true)
    try {
      // ✅ Cambiado: Llamamos a la función dedicada que ya agrupa todo en toxicityApi
      const listaFinal = await obtenerHistorialGlobal()
      setHistorialVideos(listaFinal)
    } catch (error) {
      console.error("Error cargando Supabase en Frontend:", error)
    } finally {
      setLoading(false)
    }
  }

  // 2. Función para eliminar un video de Supabase
  const eliminarVideo = async (videoId) => {
    try {
      // ✅ Cambiado: Usamos la función optimizada del servicio externo
      await eliminarAnalisisVideo(videoId)
      
      // Refrescamos los datos localmente para que desaparezca de la pantalla
      cargarDatosDesdeSupabase()
    } catch (error) {
      console.error("Error al eliminar:", error)
      alert("No se pudo eliminar de Supabase")
    }
  }

  // Cargar datos automáticamente al iniciar la app
  useEffect(() => {
    cargarDatosDesdeSupabase()
  }, [])

  // Recargar datos cada vez que el usuario navega a Analytics o History para ver lo último procesado
  useEffect(() => {
    if (currentPage === 'analytics' || currentPage === 'history') {
      cargarDatosDesdeSupabase()
    }
  }, [currentPage])

  const renderPage = () => {
    switch (currentPage) {
      case 'home': 
        return <Home onAnalisisCompletado={cargarDatosDesdeSupabase} />
      case 'analytics': 
        return <Analytics datos={historialVideos} loading={loading} onEliminar={eliminarVideo} />
      case 'history':  
        return <History datos={historialVideos} loading={loading} onEliminar={eliminarVideo} />
      case 'settings': 
        return <Settings />
      default:         
        return <Home />
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#131316]">
      {/* Sidebar fijo */}
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Contenido */}
      <div className="flex-1 h-full overflow-y-auto bg-black flex flex-col">
        {renderPage()}
      </div>
    </div>
  )
}