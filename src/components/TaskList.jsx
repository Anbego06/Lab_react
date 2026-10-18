import Button from "./Button";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";

// Tutorial 12 · TaskList ya no guarda estado propio: el filtro y la búsqueda
// están levantados a App (lifting state up) y la lista llega YA filtrada.
// TaskList solo presenta: filtros, búsqueda y las filas (TaskItem).
const TaskList = ({
  tareas,
  hayTareas,
  filtro,
  onCambiarFiltro,
  busqueda,
  onCambiarBusqueda,
  onToggle,
  onEliminar,
  onEditar,
  guardando,
}) => {
  return (
    <div>
      {/* Botones de filtro: el activo es "primary", los demás "secondary" */}
      <div className="filtros">
        <Button
          label="Todas"
          icono="📋"
          onClick={() => onCambiarFiltro("todas")}
          variant={filtro === "todas" ? "primary" : "secondary"}
        />
        <Button
          label="Pendientes"
          icono="⏳"
          onClick={() => onCambiarFiltro("pendientes")}
          variant={filtro === "pendientes" ? "primary" : "secondary"}
        />
        <Button
          label="Completadas"
          icono="✅"
          onClick={() => onCambiarFiltro("completadas")}
          variant={filtro === "completadas" ? "primary" : "secondary"}
        />
      </div>

      {/* Tutorial 12 (tarea formativa): filtro por texto, combinado con el de estado */}
      <input
        type="search"
        className="task-input task-busqueda"
        placeholder="Buscar por título..."
        aria-label="Buscar tareas por título"
        value={busqueda}
        onChange={(e) => onCambiarBusqueda(e.target.value)}
      />

      {/* Tutorial 10 (tarea formativa): EmptyState con renderizado condicional */}
      {tareas.length === 0 && (
        <EmptyState
          icono={hayTareas ? "🔍" : "📭"}
          mensaje={
            hayTareas
              ? "Ninguna tarea coincide con el filtro o la búsqueda."
              : "No hay tareas todavía. ¡Agrega la primera!"
          }
        />
      )}

      <ul className="task-list">
        {tareas.map((tarea) => (
          <TaskItem
            key={tarea.id}
            tarea={tarea}
            deshabilitado={guardando}
            onToggle={onToggle}
            onEliminar={onEliminar}
            onEditar={onEditar}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
