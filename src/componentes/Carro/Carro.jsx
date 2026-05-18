import { useCart } from "../../contexto/CartContext.jsx";
import "./Carro.css";

export const Cart = () => {
    const { cart, totalCarro, eliminarDelCarro, restarDelCarro, vaciarCarro, checkOut } = useCart(); // Se utiliza el hook useCart para acceder al estado del carrito y a las funciones relacionadas con el carrito, como eliminar productos, vaciar el carrito y finalizar la compra.

    if (cart.length === 0) { // Si el carrito está vacío (es decir, si la longitud del array cart es 0), se muestra un mensaje indicando que el carrito está vacío.
        return <p>El carrito está vacío</p>;
    }

    return (
        <div className="cart">
            <h2>Tu carrito</h2>
            <ul className="cart-list">
                {cart.map((item) => (
                    <li key={item.id} className="cart-item">
                        <span>{item.title}</span>
                        <span>Cantidad: {item.quantity}</span>
                        <span>${item.price * item.quantity}</span>
                        <button onClick={() => restarDelCarro(item.id)}>➖</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => eliminarDelCarro(item.id)}>❌</button>
                    </li>
                ))}
            </ul>
            <p className="cart-total">Total: ${totalCarro()}</p>
            <button onClick={vaciarCarro}>Vaciar carrito</button>
            <button onClick={checkOut}>Finalizar compra</button>
        </div>
    )
}