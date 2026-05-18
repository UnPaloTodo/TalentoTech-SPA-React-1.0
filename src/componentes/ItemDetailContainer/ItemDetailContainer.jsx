import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItemDetail } from "../ItemDetail/ItemDetail"

export const ItemDetailContainer = () => { // Se define el componente ItemDetailContainer, que es responsable de mostrar los detalles de un producto específico. Se utiliza el hook useParams para obtener el parámetro "id" de la URL, que se utilizará para identificar el producto a mostrar. Se definen dos estados: itemDetail para almacenar los detalles del producto y cargando para indicar si los datos están siendo cargados. Se utiliza useEffect para realizar una solicitud fetch a un archivo JSON que contiene los datos de los productos, y se busca el producto que coincide con el id obtenido de la URL. Si se encuentra el producto, se actualiza el estado itemDetail con sus detalles; si no se encuentra, se lanza un error. Finalmente, se maneja el estado de carga y se muestra el componente ItemDetail con los detalles del producto encontrado.
    const { id } = useParams()
    const [itemDetail, setItemDetail] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        // setCargando(true)
        fetch("/datos/productos.json")
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                const producto = datos.find((item) => String(item.id) === id)
                if (!producto) throw new Error("Producto no encontrado")
                setItemDetail(producto)
            })
            .catch((error) => console.log("Error al cargar productos", error))
            .finally(() => setCargando(false))
    }, [id])

    if (cargando) return <p>Cargando...</p>
    if (!itemDetail) return <p>Producto no encontrado</p>

    return (
        <section>
            <h1>Detalles del producto</h1>
            <div className="products-container">
                <ItemDetail item={itemDetail} />
            </div>
        </section>
    )
}