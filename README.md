# NPL_Frontend_Team2

Aplicación frontend desarrollada con **React + Vite**, orientada al análisis de toxicidad mediante NLP. Incluye componentes de visualización de resultados, tarjetas de análisis y navegación responsiva (mobile/desktop).

---

## 📁 Estructura de Carpetas

```
NPL_Frontend_Team2/
├── public/                     # Archivos estáticos públicos
├── src/
│   ├── api/                    # Llamadas a APIs externas o servicios NLP
│   ├── assets/                 # Imágenes, íconos y recursos estáticos
│   ├── components/             # Componentes reutilizables de la UI
│   │   ├── AnalyzeCard.jsx     # Tarjeta principal de análisis de texto
│   │   ├── BottomNav.jsx       # Navegación inferior (mobile)
│   │   ├── Footer.jsx          # Pie de página
│   │   ├── RecentCard.jsx      # Tarjeta de resultados recientes (con soporte mobile)
│   │   ├── ResultsPanel.jsx    # Panel de resultados de análisis
│   │   └── Sidebar.jsx         # Barra lateral de navegación
│   ├── pages/                  # Páginas/vistas principales de la app
│   ├── services/               # Lógica de negocio y llamadas a servicios
│   ├── App.css                 # Estilos globales de la app
│   ├── App.jsx                 # Componente raíz de la aplicación
│   ├── index.css               # Estilos base / reset
│   └── main.jsx                # Punto de entrada de React
├── .env                        # Variables de entorno (no incluir en git)
├── .gitignore
├── eslint.config.js            # Configuración de ESLint
├── index.html                  # HTML raíz de Vite
├── package.json                # Dependencias y scripts del proyecto
├── package-lock.json
├── postcss.config.js           # Configuración de PostCSS
├── tailwind.config.js          # Configuración de Tailwind CSS
├── vite.config.js              # Configuración de Vite
└── README.md
```

---

## 🧩 Componentes Destacados

### `RecentCard.jsx`
Muestra un resultado reciente de análisis. Acepta las siguientes props:

| Prop       | Tipo      | Descripción                                      |
|------------|-----------|--------------------------------------------------|
| `title`    | `string`  | Título del análisis                              |
| `time`     | `string`  | Marca de tiempo del análisis                     |
| `toxicity` | `number`  | Puntuación de toxicidad (0–100)                  |
| `badge`    | `string`  | Etiqueta/categoría del resultado                 |
| `image`    | `string`  | URL de imagen de fondo (opcional)                |
| `mobile`   | `boolean` | Activa el layout compacto para móviles (default: `false`) |

> Cuando `toxicity > 50`, muestra un ícono de tendencia negativa en color ámbar.

---

## ⚙️ Requisitos Previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior (incluido con Node.js)

---

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/NPL_Frontend_Team2.git
cd NPL_Frontend_Team2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example` (si existe):

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
VITE_API_URL=https://tu-api-backend.com
VITE_API_KEY=tu_clave_api
```

> ⚠️ Las variables de entorno en Vite deben comenzar con `VITE_` para estar disponibles en el cliente.

### 4. Iniciar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```
Local:   http://localhost:5173/
Network: usar --host para exponer en red local
```

---

## 🏗️ Scripts Disponibles

| Comando           | Descripción                                      |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Inicia el servidor de desarrollo con HMR        |
| `npm run build`   | Genera el build de producción en `/dist`         |
| `npm run preview` | Previsualiza el build de producción localmente   |
| `npm run lint`    | Ejecuta ESLint para revisar el código            |

---

## 🛠️ Stack Tecnológico

| Tecnología       | Versión   | Uso                                      |
|------------------|-----------|------------------------------------------|
| React            | 18+       | Librería de UI                           |
| Vite             | 8.0.13    | Bundler y servidor de desarrollo         |
| Tailwind CSS     | 3+        | Estilos utilitarios                      |
| PostCSS          | —         | Procesador de CSS                        |
| ESLint           | —         | Linting y calidad de código              |

---

## 📦 Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `/dist`. Para servir el build localmente:

```bash
npm run preview
```

---

## 🤝 Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m "feat: descripción del cambio"`
4. Haz push a tu rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request hacia la rama `develop`

---

## 📄 Licencia

Este proyecto es de uso interno del equipo. Consulta con los mantenedores para más información sobre licenciamiento.
