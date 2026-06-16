import { Link, useParams } from "react-router-dom" /* Se importan los componentes Link y el hook useParams desde la biblioteca react-router-dom. Link se utiliza para crear enlaces de navegación dentro de la aplicación, mientras que useParams se utiliza para acceder a los parámetros de la URL. */

export const ProductoSuceso = () => {
    const { id } = useParams() /* Se importa el hook useParams desde react-router-dom para acceder a los parámetros de la URL. En este caso, se extrae el parámetro id de la URL utilizando destructuring. */

    return (
        <section className="success-page">
            <div className="success-icon">✅</div> {/* Se muestra un ícono de éxito utilizando un emoji. */}
            <h2>Producto cargado con éxito</h2> {/* Se muestra un mensaje de éxito indicando que el producto se ha cargado correctamente. */}
            <p>ID de producto: {id}</p> {/* Se muestra el ID del producto que se ha cargado, utilizando el valor extraído de los parámetros de la URL. */}
            <p>Puede cargar otro haciendo click en el botón.</p> {/* Se muestra un mensaje indicando que el usuario puede cargar otro producto haciendo clic en el botón. */}
            <Link className="btn bg-primary primary" to="/admin" replace> {/* Se utiliza el componente Link de react-router-dom para crear un enlace que redirige al usuario a la página de administración ("/admin") para agregar otro producto. La opción replace se utiliza para reemplazar la entrada actual en el historial del navegador, evitando que el usuario pueda volver a la página de éxito utilizando el botón de retroceso. */}
                Agregar otro producto
            </Link>
        </section>
    )
}