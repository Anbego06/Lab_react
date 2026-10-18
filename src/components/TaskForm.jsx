import { useState } from "react";
// Tutorial 10: usamos el componente reutilizable Button en lugar de <button>
import Button from "./Button";

// TaskForm recibe onAgregar desde App.jsx; se ejecuta cuando el usuario envía
// una tarea válida. `guardando` deshabilita el formulario durante el POST.
const TaskForm = ({ onAgregar, guardando = false }) => {
  // Input controlado: su valor SIEMPRE refleja este estado
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    // Evita que el formulario recargue la página
    e.preventDefault();

    // Tutorial 12: validación más estricta (al menos 3 caracteres útiles)
    if (titulo.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return;
    }

    // onAgregar devuelve true si el POST fue exitoso: solo entonces se limpia el campo
    const ok = await onAgregar(titulo.trim());
    if (ok) {
      setTitulo("");
      setError("");
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">Agregar Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
            setError("");
          }}
          placeholder="Escribe el título de la tarea..."
          className="task-input"
          disabled={guardando}
        />
        <Button label="Agregar" variant="primary" disabled={guardando} />
      </form>

      {/* Renderizado condicional: el mensaje solo aparece si hay error */}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default TaskForm;
