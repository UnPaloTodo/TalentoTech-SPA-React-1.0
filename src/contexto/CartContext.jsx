import { createContext, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';


const CartContexto = createContext(); // Se crea un contexto -CartContexto- para el carrito de compras (para compartir el estado del carrito entre componentes sin necesidad de pasar props manualmente a cada nivel)

export const useCart = () => { // Se exporta un hook personalizado -useCart- que permite a los componentes acceder al contexto del carrito de manera más sencilla, evitando la necesidad de importar useContext y CartContexto en cada componente que necesite acceder al carrito.

    const contexto = useContext(CartContexto); // Se utiliza el hook useContext para acceder al contexto CartContexto, facilitando el acceso al estado del carrito desde cualquier componente que lo necesite.

    if (!contexto) {
        throw new Error("useCart debe ser utilizado dentro de un CartProvider"); // Si el contexto no está disponible, se lanza un error indicando que el hook debe ser utilizado dentro de un proveedor de carrito (CartProvider).
    }
    return contexto; // Si el contexto está disponible, se devuelve el contexto para que los componentes puedan acceder a él.
}

export const CartProvider = ({ children }) => { // Se crea un componente proveedor -CartProvider- que envuelve a los componentes hijos-children y proporciona el estado del carrito a través del contexto.

    const navigate = useNavigate(); // Se utiliza el hook useNavigate para redirigir a los usuarios después de realizar una compra.

    const [cart, setCart] = useState([]); // Se utiliza el hook useState para crear un estado local -cart- que representa el carrito de compras, inicialmente vacío.

    const hayEnCarro = (id) => { // Función para verificar si un producto ya está en el carrito, recibe un id como argumento.
        return cart.some((product) => product.id === id); // Devuelve true si algún producto en el carrito tiene el mismo id que el proporcionado, indicando que el producto ya está en el carrito.
    }

    const agregarAlCarro = (item) => { // Función para agregar un producto al carrito, recibe un objeto item como argumento.
        
        if (hayEnCarro(item.id)) { // Verifica si el producto ya está en el carrito utilizando la función hayEnCarro.
            setCart ((prevCart) => prevCart.map((product) => product.id === item.id ? { ...product, quantity: product.quantity + item.quantity } : product)); // Si el producto ya está en el carrito, se actualiza la cantidad del producto existente en el carrito utilizando setCart, creando un nuevo array donde se incrementa la cantidad del producto correspondiente.
            alert ("Producto actualizado en el carrito ✅"); // muestra una alerta indicando que el producto ha sido actualizado en el carrito.
            return; // Se detiene la ejecución de la función para evitar agregar el producto nuevamente al carrito.
        }
        setCart ((prevCart) => [...prevCart, item]); // Si el producto no está en el carrito, se agrega al carrito utilizando setCart, creando un nuevo array que incluye todos los productos existentes en el carrito más el nuevo producto.
        alert("Producto agregado al carrito ✅"); // Se muestra una alerta indicando que el producto ha sido agregado al carrito.
    }

    const eliminarDelCarro = (id) => { // Función para eliminar un producto del carrito, recibe un id como argumento.
        const nuevoCarro = cart.filter((product) => product.id !== id); // Crea un nuevo array -nuevoCarro- que contiene todos los productos del carrito excepto el producto con el id proporcionado, utilizando el método filter.
        setCart(nuevoCarro); // Actualiza el estado del carrito con el nuevo array, eliminando el producto del carrito.
        alert("Producto eliminado del carrito ❌"); // Se muestra una alerta indicando que el producto ha sido eliminado del carrito.
    }

    const restarDelCarro = (id) => { // Función para restar la cantidad de un producto en el carrito, recibe un id como argumento.
        setCart((prevCart) => prevCart.map((product) => product.id === id ? { ...product, quantity: product.quantity - 1} : product).filter((product) => product.quantity > 0)
    ); 
        alert("Producto actualizado en el carrito ✅"); // Se muestra una alerta indicando que el producto ha sido actualizado en el carrito.
    }
    const vaciarCarro = () => { // Función para limpiar el carrito, vaciando su contenido.
        setCart([]); // Se establece el estado del carrito a un array vacío, eliminando todos los productos del carrito.
    }

    const productosEnCarro = () => { // Función para verificar si hay productos en el carrito.
        return cart.length; // Devuelve la cantidad de productos en el carrito, utilizando la propiedad length del array cart.
    }

    const totalCarro = () => { // Función para calcular el total del carrito, sumando el precio de cada producto multiplicado por su cantidad.
        console.log("cart para calcular total:", cart);
        const total = cart.reduce((acumulador, item) => acumulador + item.precio * item.quantity, 0);
        return total; // Devuelve el total calculado del carrito.
    }

    const checkOut = () => { // Función para realizar el proceso de compra, vaciando el carrito y mostrando un mensaje de agradecimiento.
        vaciarCarro(); // Llama a la función vaciarCarro para limpiar el carrito después de realizar la compra.
        alert("Gracias por tu compra💥"); // Se muestra una alerta agradeciendo al usuario por su compra.
        navigate("/"); // Redirige al usuario a la página principal después de realizar la compra.
    }

    const values = { agregarAlCarro, vaciarCarro, eliminarDelCarro, restarDelCarro, totalCarro, productosEnCarro, checkOut, cart } // Se crea un objeto -values- que contiene las funciones para agregar, eliminar, vaciar el carrito, contar y sumar, así como el estado actual del carrito (cart).
    return <CartContexto.Provider value={values} > {/* El valor proporcionado al contexto incluye el estado del carrito (cart) y la función para actualizarlo (setCart). */}
        {children} {/* Se renderizan los componentes hijos dentro del proveedor, permitiéndoles acceder al contexto del carrito. */}
    </CartContexto.Provider>
}