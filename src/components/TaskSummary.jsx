// Tutorial 12 · El resumen ya no guarda un contador propio: recibe valores
// calculados en App (estado derivado) y solo los muestra.
// `mostrando` y `filtroActual` reflejan el efecto del filtro levantado a App.
const TaskSummary = ({ total, completadas, pendientes, mostrando, filtroActual }) => {
  return (
    <div className="summary-grid">
      <div className="summary-item">
        <p className="summary-numero">{total}</p>
        <p className="summary-label">Total</p>
      </div>
      <div className="summary-item">
        <p className="summary-numero summary-completadas">{completadas}</p>
        <p className="summary-label">Completadas</p>
      </div>
      <div className="summary-item">
        <p className="summary-numero summary-pendientes">{pendientes}</p>
        <p className="summary-label">Pendientes</p>
      </div>
      <div className="summary-item">
        <p className="summary-numero summary-mostrando">{mostrando}</p>
        <p className="summary-label">Mostrando ({filtroActual})</p>
      </div>
    </div>
  );
};

export default TaskSummary;
