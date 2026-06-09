import { Link } from "react-router-dom"
import "./Nav.css"
import { useCart } from "../../contexto/CartContext.jsx";

export const Nav = () => {

    const { productosEnCarro, cart } = useCart(); // Se utiliza el hook useCart para acceder a la función productosEnCarro y al estado del carrito (cart) desde el contexto del carrito, lo que permite obtener la cantidad de productos en el carrito y el contenido del carrito para mostrarlo en la barra de navegación.

    const totalItems = productosEnCarro(); // Se llama a la función productosEnCarro para obtener el total de productos en el carrito, y se almacena en la variable totalItems, que se utilizará para mostrar la cantidad de productos en el carrito en la barra de navegación.

    console.log("totalItems:", totalItems, "cart:", cart); // Agrega un console.log para verificar el valor de totalItems y el contenido del carrito, para ayudar a identificar problemas relacionados con la función productosEnCarro o con el estado del carrito.

    return (
        <nav>
            <ul className="nav-list">
                <li>
                    <Link to={"/"}>Home 🏠</Link>
                </li>
                <li>
                    <Link to={"/categoria/frutas-dulces"}>Frutas dulces</Link> 
                    <Link to={"/categoria/frutas-acidas"}>Frutas ácidas</Link>
                    <Link to={"/categoria/frutas-semi-acidas"}>Frutas semi ácidas</Link>
                </li>
                <li>
                    <Link to={"/contador"}>Contador</Link>
                </li>
                <li>
                    <Link to={"/carrito"}>Carro de Compras 🛒
                        {totalItems > 0 && <span className="cart-count">{totalItems}</span>} {/* Si el total del carrito es mayor que cero, se muestra un contador con la cantidad de productos en el carrito. */}
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
