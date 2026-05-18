import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemList.css";


export const ItemList = ({ productos }) => { // El componente ItemList recibe una prop llamada productos, que es un array de objetos que representan los productos a mostrar en la lista. Se utiliza la función map para iterar sobre el array de productos y renderizar un componente Item para cada producto, pasando las propiedades del producto como props al componente Item. Cada producto se envuelve en un componente Link que redirige a la página de detalles del producto correspondiente cuando se hace clic en él.

    if (!productos.length) {
        return <p>No hay productos</p>
    }

    return (
        <div className="productos-container">
            {productos.map((producto) => (
                <Link to={`/producto/${producto.id}`} key={producto.id} > {/* Se utiliza el componente Link de react-router-dom para crear un enlace que redirige a la página de detalles del producto correspondiente, utilizando el id del producto en la ruta. El atributo key se establece en el id del producto para ayudar a React a identificar cada elemento de la lista de manera única. */}
                    <Item {...producto} /> {/* Se renderiza el componente Item, pasando todas las propiedades del producto como props utilizando el operador spread (...). Esto permite que el componente Item reciba todas las propiedades del producto de manera individual, facilitando su uso dentro del componente Item para mostrar la información del producto. */}
                </Link>
            ))}
        </div>
    )
}