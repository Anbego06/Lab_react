#TaskCampus — Laboratorio de React

Aplicación de gestión de tareas académicas construida progresivamente a lo largo de **12 tutoriales** con **React 19** y **Vite**. Cada tutorial introduce conceptos fundamentales de React, desde la creación del proyecto hasta la comunicación con APIs y patrones avanzados de estado.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Características

- **CRUD completo** — Crear, leer, actualizar y eliminar tareas
- **Comunicación con API REST** — Consume [JSONPlaceholder](https://jsonplaceholder.typicode.com/) con `fetch` y `async/await`
- **Edición en línea** — Doble clic o F2 para editar el título de una tarea directamente
-  **Filtrado por estado** — Todas, pendientes o completadas
- **Búsqueda por texto** — Filtra tareas por título en tiempo real
- **Resumen dinámico** — Panel con contadores de tareas (total, completadas, pendientes, mostrando)
- **Confirmación de eliminación** — Modal reutilizable antes de eliminar
- **Manejo de errores** — Errores de carga y de operación diferenciados
- **Indicador de carga** — Feedback visual durante operaciones HTTP
- **Diseño responsivo** — Se adapta a pantallas pequeñas
- **Accesibilidad** — Roles ARIA, navegación con teclado y `focus-visible`

---

## Arquitectura del Proyecto

```
Lab_react/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Imágenes y recursos estáticos
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/          # Componentes de UI reutilizables
│   │   ├── Badge.jsx        # Etiqueta de estado (pendiente/completada)
│   │   ├── Button.jsx       # Botón reutilizable con variantes
│   │   ├── Card.jsx         # Tarjeta contenedora genérica (children)
│   │   ├── EmptyState.jsx   # Estado vacío amistable
│   │   ├── Header.jsx       # Encabezado de la aplicación
│   │   ├── Modal.jsx        # Modal de confirmación reutilizable
│   │   ├── TaskForm.jsx     # Formulario para agregar tareas
│   │   ├── TaskItem.jsx     # Fila de tarea con edición en línea
│   │   ├── TaskList.jsx     # Lista filtrable de tareas
│   │   └── TaskSummary.jsx  # Panel resumen con contadores
│   ├── hooks/
│   │   └── useTareas.js     # Hook personalizado con lógica CRUD
│   ├── services/
│   │   └── tareasService.js # Capa de comunicación HTTP (fetch)
│   ├── App.jsx              # Componente raíz (coordinación)
│   ├── App.css              # Estilos de la aplicación
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── index.html
├── package.json
└── vite.config.js
```

### Flujo de datos

```
tareasService.js  →  useTareas.js (hook)  →  App.jsx (coordinación)  →  Componentes de UI
    (HTTP)              (estado)            (estado derivado)           (presentación)
```

---

## 🚀 Instalación y Uso

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/reacttuto.git

# 2. Entrar al directorio del proyecto
cd reacttuto/Lab_react

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

#### Acceso desde otro dispositivo en la red local

```bash
npm run dev -- --host
```

---

## 🎓 Progresión de Tutoriales (1 – 12)

El proyecto se construyó de manera incremental. Cada tutorial agrega nuevos conceptos sobre el anterior:

### Tutorial 1 — Introducción a React y Entorno de Desarrollo
- Instalación de **Node.js** y **npm**
- Creación del proyecto con `npm create vite@latest` (template React)
- Estructura inicial de un proyecto Vite + React
- Ejecución con `npm run dev`

### Tutorial 2 — JSX: Sintaxis y Expresiones
- Sintaxis **JSX** y diferencias con HTML (`className`, `htmlFor`)
- Expresiones JavaScript dentro de `{}`
- Fragmentos (`<>...</>`)
- Renderizado del componente raíz en `main.jsx`

### Tutorial 3 — Componentes y Props
- Creación de componentes funcionales
- Paso de datos con **props** (ej: `title`, `description` en `Header`)
- Reutilización de componentes
- Organización de archivos en carpeta `components/`

### Tutorial 4 — Estado con `useState`
- El hook **`useState`** para manejar datos dinámicos
- Actualización del estado e inmutabilidad
- Re-render automático ante cambios de estado
- Estado local vs. datos estáticos

### Tutorial 5 — Manejo de Eventos
- Eventos en React (`onClick`, `onChange`, `onSubmit`)
- Funciones handler y convención `handle...`
- `e.preventDefault()` en formularios
- Comunicación hijo → padre mediante callbacks

### Tutorial 6 — Listas, `.map()` y Keys
- Renderizado de listas con `.map()`
- La prop **`key`** y su importancia para el rendimiento
- Renderizado dinámico a partir de un array de datos

### Tutorial 7 — Renderizado Condicional
- Operador ternario (`condición ? A : B`)
- Operador lógico `&&` para mostrar/ocultar elementos
- Toggle de visibilidad con estado booleano
- Estilos condicionales (`className` dinámico)
- Clases CSS para estados completado/pendiente

### Tutorial 8 — Formularios e Inputs Controlados
- **Input controlado**: el valor siempre refleja el estado
- Validación de formulario antes de enviar
- Manejo de errores de validación con mensajes al usuario
- Limpieza del campo tras envío exitoso

### Tutorial 9 — Custom Hooks (Hooks Personalizados)
- Extracción de lógica en un hook personalizado: **`useTareas`**
- Convención `use...` para nombrar hooks
- Encapsulación de estado y operaciones
- Separación de responsabilidades: lógica vs. presentación

### Tutorial 10 — Componentes Reutilizables

| Componente | Concepto clave |
|---|---|
| `Button` | Props con variantes (`primary`, `secondary`, `danger`, `success`) e `icono` opcional |
| `Badge` | `onClick` opcional → se comporta como `<button>` o como `<span>` |
| `Card` | **`children`** como prop especial para composición |
| `Modal` | Confirmación reutilizable con cierre por Esc y clic en fondo |
| `EmptyState` | Renderizado condicional con mensaje amistable |

### Tutorial 11 — CRUD con API REST (`fetch` + `async/await`)

| Operación | Método HTTP | Función |
|---|---|---|
| Leer tareas | `GET` | `getTareas()` |
| Crear tarea | `POST` | `postTarea()` |
| Actualizar completa | `PUT` | `putTarea()` |
| Actualizar parcial | `PATCH` | `patchTarea()` |
| Eliminar tarea | `DELETE` | `deleteTarea()` |

- Capa de servicios separada (`tareasService.js`)
- Estados de **cargando**, **error** y **éxito** en el hook
- Edición en línea del título con **doble clic** o **F2** (usa PATCH)
- Manejo de errores con `try/catch`

### Tutorial 12 — Lifting State Up y Estado Derivado

| Concepto | Implementación |
|---|---|
| **Lifting state up** | `filtro` y `busqueda` viven en `App.jsx` y se pasan como props |
| **Estado derivado** | `tareasFiltradas` se calcula en cada render, sin `useState` extra |
| **Coordinación** | `App.jsx` orquesta; los hijos solo presentan |
| **Indicador `guardando`** | Deshabilita controles durante operaciones HTTP |
| **Validación** | Título con al menos 3 caracteres en formulario y edición |
| **`useEffect` con cleanup** | Título del navegador dinámico + timer con `clearInterval` |
| **Separación en capas** | `tareasService` → `useTareas` → `App` → Componentes UI |

---

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Genera la build de producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint |

---

## 📡 API

Este proyecto consume la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/todos?_limit=10` | Obtener tareas |
| `POST` | `/todos` | Crear tarea |
| `PUT` | `/todos/:id` | Actualizar tarea (completa) |
| `PATCH` | `/todos/:id` | Actualizar tarea (parcial) |
| `DELETE` | `/todos/:id` | Eliminar tarea |

> **Nota:** JSONPlaceholder simula las escrituras. Responde correctamente a POST, PUT, PATCH y DELETE, pero no persiste los cambios en el servidor.

---

## Tecnologías

- **React 19** — Biblioteca de UI
- **Vite 8** — Bundler y servidor de desarrollo
- **React Compiler** — Optimización automática de renders
- **ESLint** — Linting de código
- **CSS puro** — Estilos sin dependencias externas

---

## Licencia

Este proyecto es parte del laboratorio académico de React. Uso libre con fines educativos.
