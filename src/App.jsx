import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TaskSummary from './components/TaskSummary';
import TaskList from './components/TaskList';
import ActionButton from './components/ActionButton';

const App = () => {
  // 1. Añadimos el estado para el nombre del usuario (Tarea formativa)
  const [nombreUsuario, setNombreUsuario] = useState("Estudiante");

  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Aprender qué es React", completada: false },
    { id: 2, titulo: "Crear proyecto con Vite", completada: true },
    { id: 3, titulo: "Practicar JSX", completada: false },
  ]);

  const completarTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completada: true }
          : tarea
      )
    );
  };

  // 2. Función para cambiar el nombre a "Estudiante Anónimo"
  const hacerAnonimo = () => {
    setNombreUsuario("Estudiante Anónimo");
  };

  return (
    <div className="app-container">
      {/* 3. Actualizamos la descripción del Header para que use el estado */}
      <Header 
        title="TaskCampus" 
        description={`Bienvenido, ${nombreUsuario} - Gestor de tareas académicas`} 
      />

      {/* 4. Botón de la tarea formativa para cambiar el nombre */}
      <div style={{ textAlign: "right", marginBottom: "15px" }}>
        <button onClick={hacerAnonimo} className="task-button-secondary">
          Cambiar a Anónimo
        </button>
      </div>

      <TaskSummary total={tareas.length} />
      <TaskList tareas={tareas} onCompletar={completarTarea} />
    </div>
  );
};

export default App;