// Tutorial 10 (tarea formativa) · Estado vacío amistable.
// Props: mensaje e icono (un emoji). Se usa en TaskList con renderizado condicional.
const EmptyState = ({ mensaje, icono = "📭" }) => {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state-icono" aria-hidden="true">
        {icono}
      </span>
      <p>{mensaje}</p>
    </div>
  );
};

export default EmptyState;
