import { useState } from "react"
import { Item } from "../Item/Item"
import { Contador } from "../Contador/Contador"
import "./ItemDetail.css"
import { useCart } from "../../contexto/CartContext.jsx";
import { Link } from "react-router-dom";

export const ItemDetail = ({ item }) => { // El componente ItemDetail recibe un objeto item como prop, que contiene la información del producto a mostrar en el detalle. Se utiliza el hook useState para manejar la cantidad seleccionada por el usuario, y se importa la función agregarAlCarro desde el contexto del carrito para permitir agregar el producto al carrito con la cantidad seleccionada.
    const [cantidad, setCantidad] = useState(0) // Se utiliza el hook useState para crear un estado local llamado cantidad, que representa la cantidad seleccionada por el usuario para agregar al carrito. Inicialmente, se establece en 0.
    const { agregarAlCarro } = useCart(); // Se utiliza el hook useCart para acceder a la función agregarAlCarro del contexto del carrito, lo que permite agregar productos al carrito desde este componente.

    const handleAgregarAlCarro = () => {
        agregarAlCarro({ ...item, quantity: cantidad }); // Llama a la función agregarAlCarro del contexto para agregar el producto al carrito, pasando el objeto del producto con la cantidad seleccionada.
    }

    return (
        <Item {...item}>
            <p>{item.descripción}</p>
            <Contador cantidad={cantidad} setCantidad={setCantidad} />
            <button
                className="btn primary"
                disabled={cantidad === 0}
                onClick={handleAgregarAlCarro}>
                Agregar al carrito
            </button>
                <Link to="/" className="btn-volver">Seguir comprando</Link>
        </Item>
    )
}

// Alerta: un <button> dentro de un <Link> o viceversa es HTML inválido — los navegadores lo manejan de forma impredecible y el ruteo no funciona. Se puede dar estilo directamente al Link para que se vea como un botón en css. En este caso, se optó por colocar el Link después del botón, para que el usuario pueda seguir comprando después de agregar un producto al carrito.

// import { Item } from "../Item/Item"
// import { Contador } from "../Contador/Contador"
// import "./ItemDetail.css"

// export const ItemDetail = ({ item }) => {
//     return (
//         <Item {...item} >
//             <Contador />
//             <button className="btn primary">Agregar al carrito</button>
//         </Item>
//     )
// }