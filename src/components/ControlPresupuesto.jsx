import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    const porcetajeActual = (totalGastado * 100) / presupuesto;

    setDisponible(totalDisponible);
    setGastado(totalGastado);
    setTimeout(() => {
      setPorcentaje(porcetajeActual.toFixed(2));
    }, 1000);
  }, [gastos]);

  const formatearQty = (qty) => {
    return qty.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {

    const resultado = confirm('¿Deseas reiniciar los gastos?');

    if(resultado){
      setPresupuesto(0)
      setGastos([])
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={porcentaje.toString() + "% Gastado"}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
            trailColor: "#f5f5f5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
          })}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>Resetear App</button>
        <p>
          <span>Presupuesto: </span> {formatearQty(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
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
