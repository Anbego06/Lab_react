import { useRef, useState } from "react";
import Button from "./Button";
import Badge from "./Badge";

// Tutorial 11 (tarea formativa) y 12 (edición en línea):
// una fila de tarea con edición del título directamente en la lista.
//  - Doble clic en el título → se convierte en un <input>.
//  - Enter o perder el foco (onBlur) → llama a onEditar (editarTitulo, PATCH).
//  - Esc → cancela.
// `deshabilitado` viene del estado `guardando` del hook (indicador por operación).
const TaskItem = ({ tarea, deshabilitado, onToggle, onEliminar, onEditar }) => {
  const [editando, setEditando] = useState(false);
  const [borrador, setBorrador] = useState("");
  const [error, setError] = useState("");

  // Evitan guardar dos veces (Enter + blur) o guardar después de cancelar con Esc.
  const guardandoRef = useRef(false);
  const cerradaRef = useRef(true);

  const iniciarEdicion = () => {
    if (deshabilitado || editando) return;
    setBorrador(tarea.titulo);
    setError("");
    cerradaRef.current = false;
    setEditando(true);
  };

  const cerrar = () => {
    cerradaRef.current = true;
    setEditando(false);
    setError("");
  };

  const guardar = async () => {
    if (guardandoRef.current || cerradaRef.current) return;

    const nuevo = borrador.trim();
    if (nuevo.length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return;
    }
    if (nuevo === tarea.titulo) {
      cerrar();
      return;
    }

    guardandoRef.current = true;
    const ok = await onEditar(tarea.id, nuevo);
    guardandoRef.current = false;

    if (ok) cerrar();
    else setError("No se pudo guardar el cambio.");
  };

  const alPresionarTecla = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      guardar();
    } else if (e.key === "Escape") {
      cerrar();
    }
  };

  return (
    <li className="task-item" data-testid="tarea">
      {/* ZONA IZQUIERDA: badge + título */}
      <div className="task-item-info">
        <Badge
          texto={tarea.completada ? "completada" : "pendiente"}
          onClick={() => onToggle(tarea.id, tarea.completada)}
          disabled={deshabilitado || editando}
          title="Clic para cambiar el estado"
        />
        {editando ? (
          <div className="task-edicion">
            <input
              type="text"
              className="task-input"
              autoFocus
              aria-label={`Editar título de «${tarea.titulo}»`}
              value={borrador}
              disabled={deshabilitado}
              onChange={(e) => {
                setBorrador(e.target.value);
                setError("");
              }}
              onKeyDown={alPresionarTecla}
              onBlur={guardar}
            />
            {error && <p className="form-error">{error}</p>}
          </div>
        ) : (
          <span
            className={`task-titulo${tarea.completada ? " task-titulo-completada" : ""}`}
            title="Doble clic para editar"
            tabIndex={0}
            onDoubleClick={iniciarEdicion}
            onKeyDown={(e) => {
              if (e.key === "F2") iniciarEdicion();
            }}
          >
            {tarea.titulo}
          </span>
        )}
      </div>

      {/* ZONA DERECHA: botones */}
      <div className="task-item-acciones">
        <Button
          label={tarea.completada ? "Desmarcar" : "Completar"}
          onClick={() => onToggle(tarea.id, tarea.completada)}
          variant={tarea.completada ? "success" : "primary"}
          disabled={deshabilitado || editando}
        />
        <Button
          label="Eliminar"
          onClick={() => onEliminar(tarea.id)}
          variant="danger"
          disabled={deshabilitado || editando}
        />
      </div>
    </li>
  );
};

export default TaskItem;
