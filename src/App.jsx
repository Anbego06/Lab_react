import { useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import "./App.css";

const App = () => {
  // Arreglo de tareas inicial con useState
  const [tareas, setTareas] = useState([
    { id: 1, titulo: "Aprender qué es React", completada: false },
    { id: 2, titulo: "Crear proyecto con Vite", completada: true },
    { id: 3, titulo: "Practicar JSX", completada: false },
  ]);

  // Función para completar tarea
  const completarTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: true } : tarea,
      ),
    );
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestiona tus tareas académicas" />

      <TaskSummary total={tareas.length} />

      {/* Se pasan las tareas y la función por props */}
      <TaskList tareas={tareas} onCompletar={completarTarea} />
    </div>
  );
};

export default App;
