import { useEffect } from "react";
import Button from "./Button";

// Tutorial 10 · Modal de confirmación reutilizable.
// Props: visible, mensaje, onConfirmar, onCancelar (+ deshabilitado mientras
// hay una operación en curso). Esc y clic en el fondo cancelan.
const Modal = ({ visible, mensaje, onConfirmar, onCancelar, deshabilitado = false }) => {
  useEffect(() => {
    if (!visible) return;
    const alPresionar = (e) => {
      if (e.key === "Escape" && !deshabilitado) onCancelar();
    };
    document.addEventListener("keydown", alPresionar);
    return () => document.removeEventListener("keydown", alPresionar);
  }, [visible, deshabilitado, onCancelar]);

  if (!visible) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !deshabilitado) onCancelar();
      }}
    >
      <div className="modal-box" role="dialog" aria-modal="true">
        <p>{mensaje}</p>
        <div className="modal-acciones">
          <Button label="Confirmar" variant="danger" onClick={onConfirmar} disabled={deshabilitado} />
          <Button label="Cancelar" variant="secondary" onClick={onCancelar} disabled={deshabilitado} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
