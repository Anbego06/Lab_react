import { useState, useEffect } from "react";
import {
  getTareas,
  postTarea,
  putTarea,
  patchTarea,
  deleteTarea,
} from "../services/tareasService";

// Hook personalizado (Tutoriales 9, 11 y 12): encapsula TODO el estado de las
// tareas y sus operaciones CRUD. Las llamadas HTTP viven en tareasService.js.
//
// Formato interno de una tarea: { id, titulo, completada }
// La API usa { id, title, completed }; aquí se traduce en los dos sentidos.
const useTareas = () => {
  const [tareas, setTareas] = useState([]);
  // true mientras se carga la lista inicial
  const [cargando, setCargando] = useState(true);
  // error de la CARGA inicial (la lista no se puede mostrar)
  const [error, setError] = useState(null);
  // error de una operación (crear/editar/eliminar); la lista sigue visible
  const [errorOperacion, setErrorOperacion] = useState(null);
  // Tarea formativa T12: true mientras hay un POST/PUT/PATCH/DELETE en curso
  const [guardando, setGuardando] = useState(false);

  // ---------- READ (GET) ----------
  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await getTareas(10);
        setTareas(
          datos.map((t) => ({ id: t.id, titulo: t.title, completada: t.completed }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  // Envuelve una operación de escritura: activa `guardando`, captura errores
  // y los deja en `errorOperacion`. Devuelve true si la operación tuvo éxito.
  const ejecutar = async (operacion) => {
    setGuardando(true);
    setErrorOperacion(null);
    try {
      await operacion();
      return true;
    } catch (err) {
      setErrorOperacion(err.message);
      return false;
    } finally {
      setGuardando(false);
    }
  };

  // ---------- CREATE (POST) ----------
  const crearTarea = (titulo) =>
    ejecutar(async () => {
      const nueva = await postTarea(titulo);
      // JSONPlaceholder siempre responde id: 201, así que usamos Date.now()
      // como id local único. Forma funcional del setter: parte de `prev`.
      setTareas((prev) => [
        { id: Date.now(), titulo: nueva.title, completada: nueva.completed },
        ...prev,
      ]);
    });

  // ---------- UPDATE (PUT): cambia cualquier campo, p. ej. { completada: true } ----------
  const actualizarTarea = (id, cambios) =>
    ejecutar(async () => {
      const actual = tareas.find((t) => t.id === id);
      const nueva = { ...actual, ...cambios };
      // PUT reemplaza el objeto completo; se envía con los nombres de la API.
      await putTarea(id, {
        id,
        userId: 1,
        title: nueva.titulo,
        completed: nueva.completada,
      });
      setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, ...cambios } : t)));
    });

  // ---------- UPDATE (PATCH): solo el título (tarea formativa T11) ----------
  const editarTitulo = (id, nuevoTitulo) =>
    ejecutar(async () => {
      await patchTarea(id, { title: nuevoTitulo });
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, titulo: nuevoTitulo } : t))
      );
    });

  // ---------- DELETE ----------
  const eliminarTarea = (id) =>
    ejecutar(async () => {
      await deleteTarea(id);
      setTareas((prev) => prev.filter((t) => t.id !== id));
    });

  const limpiarErrorOperacion = () => setErrorOperacion(null);

  return {
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
  };
};

export default useTareas;
