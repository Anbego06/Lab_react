import { useState } from "react";

const TaskList = ({ tareas, onCompletar }) => {
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  return (
    <div className="card">
      <h2 className="section-title">Lista de Tareas</h2>
      <button
        className="task-button task-list-toggle-btn"
        onClick={() => setMostrarDetalle(!mostrarDetalle)}
      >
        {mostrarDetalle ? "Ocultar detalle" : "Ver detalle"}
      </button>

      {mostrarDetalle && (
        <p className="task-detail-box">Aquí aparecería el detalle de las tareas pendientes.</p>
      )}

      <ul className="task-list-clean">
        {tareas.map((tarea) => (
          <li
            key={tarea.id}
            className="task-item task-item-flex"
          >
            <span className={tarea.completada ? "task-text-completed" : "task-text"}>
              {tarea.titulo}
            </span>

            {tarea.completada ? (
              <span className="task-badge-success">✅</span>
            ) : (
              <button
                className="task-button"
                onClick={() => onCompletar(tarea.id)}
              >
                Completar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;