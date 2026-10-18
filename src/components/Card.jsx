// Tutorial 10 · Tarjeta genérica.
// `children` es la prop especial de React con todo lo que se escribe entre la
// etiqueta de apertura y la de cierre: el componente "envuelve" contenido
// sin saber qué hay adentro.
const Card = ({ titulo, children }) => {
  return (
    <div className="card">
      {titulo && <h2 className="section-title">{titulo}</h2>}
      {children}
    </div>
  );
};

export default Card;
