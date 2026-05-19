import { useCart } from "../../contexto/CartContext.jsx";
import "./Carro.css";
import { Link } from "react-router-dom";

export const Cart = () => {
    const { cart, totalCarro, eliminarDelCarro, restarDelCarro, vaciarCarro, checkOut } = useCart(); // Se utiliza el hook useCart para acceder al estado del carrito y a las funciones relacionadas con el carrito, como eliminar productos, vaciar el carrito y finalizar la compra.

    if (cart.length === 0) { // Si el carrito está vacío (es decir, si la longitud del array cart es 0), se muestra un mensaje indicando que el carrito está vacío.
        return (
            <div> <p>El carrito está vacío</p>
                <Link to="/" className="btn-volver">Ver Productos</Link>
            </div>
        )
    }

    return (
        <div className="cart">
            <h2>Tu carrito</h2>
            <ul className="cart-list">
                {cart.map((item) => (
                    <li key={item.id} className="cart-item">
                        <span>{item.nombre}</span>
                        <button onClick={() => restarDelCarro(item.id)}>➖</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => eliminarDelCarro(item.id)}>❌</button>
                        <span>${item.precio * item.quantity}</span>
                    </li>
                ))}
            </ul>
            <p className="cart-total">Total: ${totalCarro()}</p>
            <button onClick={vaciarCarro}>Vaciar carrito</button>
            <button onClick={checkOut}>Finalizar compra</button>
        </div>
    )
}

// Atención: todo lo que va después de return es código que no se ejecuta. Por eso, el Link para volver a ver los productos va dentro del bloque if, antes del return.