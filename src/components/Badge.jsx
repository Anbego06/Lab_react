// Tutorial 10 · Etiqueta de estado reutilizable.
// Tarea formativa: acepta onClick; si se entrega, el badge se comporta como
// botón (p. ej. para cambiar el estado de la tarea con un clic).
const colorMap = {
  pendiente: "#f59e0b",
  completada: "#16a34a",
  en_progreso: "#2563eb",
};

const Badge = ({ texto, onClick, disabled = false, title }) => {
  const color = colorMap[texto] || "#6b7280";
  const estilo = {
    backgroundColor: color,
    color: "#fff",
    padding: "2px 10px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: 600,
  };

  if (onClick) {
    return (
      <button
        type="button"
        className="badge badge-boton"
        style={estilo}
        onClick={onClick}
        disabled={disabled}
        title={title}
      >
        {texto}
      </button>
    );
  }

  return (
    <span className="badge" style={estilo}>
      {texto}
    </span>
  );
};

export default Badge;
