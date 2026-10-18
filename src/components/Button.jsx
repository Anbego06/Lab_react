// Tutorial 10 · Botón reutilizable.
// Props: label, onClick, variant ("primary" | "secondary" | "danger" | "success"),
// disabled y, opcional, icono (tarea formativa: el botón puede o no traer icono).
// Sin `onClick`, el botón queda como "submit" para usarse dentro de un <form>.
const Button = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  icono,
  type,
}) => {
  return (
    <button
      type={type ?? (onClick ? "button" : "submit")}
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icono && (
        <span className="btn-icono" aria-hidden="true">
          {icono}
        </span>
      )}
      {label}
    </button>
  );
};

export default Button;
