import React from 'react';
import './Contador.css'
import { FaPlus, FaMinus } from "react-icons/fa"

export const Contador = ({ cantidad, setCantidad }) => {  // acá la función componente recibe las props cantidad y setCantidad, que se utilizan para mostrar la cantidad actual y actualizarla respectivamente. Estas props son pasadas desde el componente padre (ItemDetail) donde se maneja el estado de cantidad.

    const sumar = () => setCantidad(cantidad + 1)

    const restar = () => {
        if (cantidad > 0) setCantidad(cantidad - 1)
    }

    return (
        <div className='contenedor-contador'>
            <button
                className="btn primary"
                onClick={restar}
                disabled={cantidad === 0}>
                <FaMinus />
            </button>

            <p>Selección: {cantidad}</p>

            <button className='btn primary' onClick={sumar}>
                <FaPlus />
            </button>
        </div>
    )
}
// return (
//     <div>
//         <h2>Contador: {contador}</h2>
//         <button onClick={() => setContador(contador + 1)}>Sumar</button>
//         <button onClick={() => setContador(contador - 1)}>Restar</button>
//     </div>
// );

