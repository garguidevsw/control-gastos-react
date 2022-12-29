import { useEffect, useState } from "react";

const ControlPresupuesto = ({ presupuesto, gastos }) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto) => {
      return gasto.cantidad + total
    }, 0)
    const totalDisponible = presupuesto - gastado;
    setDisponible( totalDisponible )
    setGastado(totalGastado)
  }, [gastos])

  
  const formatearQty = (qty) => {
    return qty.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>Grafica</p>
      </div>

      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span> {formatearQty(presupuesto)}
        </p>
        <p>
          <span>Disponible: </span> {formatearQty(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearQty(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
