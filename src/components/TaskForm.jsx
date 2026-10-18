import { useState } from "react";

const TaskForm = ({ onAgregar }) => {
    const [titulo, setTitulo] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (titulo.trim() === "") {
            setError("El título de la tarea no puede estar vacío.");
            return;
        }

        onAgregar(titulo.trim());

        setTitulo("");

        setError("");
    };

    return (

        <form onSubmit={handleSubmit} className="card">

            <h2 className="section-title">Agregar Nueva Tarea</h2>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px"}}>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ej: Estudiar para prueba de Física"
                    style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1"}}
                />
                <button type="submit" className="task-button">Agregar</button>    
            </div>

            {error && <p style={{ color :"red", fontSize: "0.875rem"}}>{error}</p>}
        </form>
    );
};

export default TaskForm;