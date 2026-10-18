
const API_URL = "https://jsonplaceholder.typicode.com/todos";
const CABECERAS = { "Content-Type": "application/json" };

// GET /todos?_limit=N — Read
export const getTareas = async (limite = 10) => {
  const res = await fetch(`${API_URL}?_limit=${limite}`);
  if (!res.ok) throw new Error("Error al obtener tareas");
  return await res.json();
};

// POST /todos — Create
export const postTarea = async (titulo) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: CABECERAS,
    body: JSON.stringify({ title: titulo, completed: false, userId: 1 }),
  });
  if (!res.ok) throw new Error("Error al crear tarea");
  return await res.json();
};

// PUT /todos/:id — Update (reemplaza el objeto completo)
export const putTarea = async (id, datos) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: CABECERAS,
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error("Error al actualizar tarea");
  return await res.json();
};

// PATCH /todos/:id — Update parcial (solo los campos enviados). Tarea formativa del Tutorial 11.
export const patchTarea = async (id, cambios) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: CABECERAS,
    body: JSON.stringify(cambios),
  });
  if (!res.ok) throw new Error("Error al editar tarea");
  return await res.json();
};

// DELETE /todos/:id — Delete
export const deleteTarea = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar tarea");
};
