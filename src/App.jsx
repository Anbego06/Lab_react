import { useState, useEffect } from "react";
import useTareas from "./hooks/useTareas";
import Card from "./components/Card";
import Header from "./components/Header";
import Modal from "./components/Modal";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import TaskForm from "./components/TaskForm";
import "./App.css";

// Tutorial 12 · App es la capa de COORDINACIÓN: estado compartido (filtro,
// búsqueda, tarea a eliminar), datos derivados y handlers. La lógica de datos
// vive en useTareas y las llamadas HTTP en services/tareasService.js.
const App = () => {
  const {
    tareas,
    cargando,
    error,
    errorOperacion,
    guardando,
    crearTarea,
    actualizarTarea,
    editarTitulo,
    eliminarTarea,
    limpiarErrorOperacion,
  } = useTareas();

  const [tareaAEliminar, setTareaAEliminar] = useState(null);

  // Estado levantado a App (lifting state up): lo comparten TaskList y TaskSummary
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  // Estado DERIVADO: se calcula en cada render a partir de `tareas`, `filtro`
  // y `busqueda`; no es otro useState, así nunca se desincroniza.
  const texto = busqueda.trim().toLowerCase();
  const tareasFiltradas = tareas.filter((t) => {
    const coincideEstado =
      filtro === "completadas" ? t.completada : filtro === "pendientes" ? !t.completada : true;
    const coincideTexto = texto === "" || t.titulo.toLowerCase().includes(texto);
    return coincideEstado && coincideTexto;
  });
  const completadas = tareas.filter((t) => t.completada).length;

  // Actualiza el título del navegador con las tareas pendientes
  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientes} pendientes)`;
  }, [tareas]);

  // Temporizador con cleanup para evitar memory leaks
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("TaskCampus activo");
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAgregarTarea = (titulo) => crearTarea(titulo);

  const handleToggleCompletada = (id, completadaActual) => {
    actualizarTarea(id, { completada: !completadaActual });
  };

  const handleConfirmarEliminacion = async () => {
    await eliminarTarea(tareaAEliminar);
    setTareaAEliminar(null);
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestiona tus tareas académicas" />

      <Card titulo="Resumen de tareas">
        <TaskSummary
          total={tareas.length}
          completadas={completadas}
          pendientes={tareas.length - completadas}
          mostrando={tareasFiltradas.length}
          filtroActual={filtro}
        />
      </Card>

      <TaskForm onAgregar={handleAgregarTarea} guardando={guardando} />

      {/* Errores de una operación (crear/editar/eliminar): la lista sigue visible */}
      {errorOperacion && (
        <p className="estado-error" role="alert">
          ⚠️ {errorOperacion}{" "}
          <button type="button" className="estado-cerrar" onClick={limpiarErrorOperacion}>
            Cerrar
          </button>
        </p>
      )}

      {/* Los tres estados de una carga: cargando / error / datos listos */}
      {cargando && <p className="estado-carga">⏳ Cargando tareas...</p>}
      {error && <p className="estado-error">⚠️ Error: {error}</p>}

      {!cargando && !error && (
        <Card titulo="Mis tareas">
          <TaskList
            tareas={tareasFiltradas}
            hayTareas={tareas.length > 0}
            filtro={filtro}
            onCambiarFiltro={setFiltro}
            busqueda={busqueda}
            onCambiarBusqueda={setBusqueda}
            onToggle={handleToggleCompletada}
            onEliminar={setTareaAEliminar}
            onEditar={editarTitulo}
            guardando={guardando}
          />
        </Card>
      )}

      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Seguro que deseas eliminar esta tarea? Esta acción no se puede deshacer."
        onConfirmar={handleConfirmarEliminacion}
        onCancelar={() => setTareaAEliminar(null)}
        deshabilitado={guardando}
      />
    </div>
  );
};

export default App;
