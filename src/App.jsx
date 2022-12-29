import { useEffect, useState } from "react";
import Filtros from "./components/Filtros";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    +localStorage.getItem('presupuesto') ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  
  const [gastos, setGastos] = useState( () => JSON.parse(localStorage.getItem('gastos')) || [])

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] =useState('')
  const [gastosFiltrados, setGastosFiltrados] =useState([])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    console.log(JSON.parse(localStorage.getItem('gastos')));
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = +localStorage.getItem('presupuesto') ?? 0
    if( presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      handleNuevoGasto()
    }
  }, [gastoEditar])

  useEffect( () => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = gasto => {
    if(gasto.id) {
      // Editar gasto
      const gastoActualizado = gastos.map( item => {
        if(item.id === gasto.id){
          gasto.fecha = Date.now()
          return gasto
        }
        return item
      })
      
      setGastos(gastoActualizado)
      localStorage.setItem('gastos', gastoActualizado)
    }else{
      // Nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      const gastosUpdate = [ ...gastos, gasto ]
      setGastos(gastosUpdate)
      localStorage.setItem('gastos', gastosUpdate)
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const eliminarGasto = (id) => {
    const data = gastos.filter( gasto => gasto.id !== id )
    setGastos(data)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos} 
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados} />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
