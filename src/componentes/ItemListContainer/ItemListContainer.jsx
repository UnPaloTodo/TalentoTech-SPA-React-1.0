import { useEffect, useState } from "react"
import { ItemList } from "../ItemList/ItemList"

export const ItemListContainer = () => {
    const [productos, setProductos] = useState([]) //se define un estado productos que se inicializa como un array vacío, y una función setProductos para actualizar ese estado, lo que permitirá almacenar y gestionar la lista de productos obtenidos del JSON o de la API para su posterior renderizado en el componente ItemList.
    const [cargando, setCargando] = useState(true) //agrega un estado para monitorear la carga de datos antes del renderizado, inicia en true porque al cargar el componente, se asume que los datos aún no están disponibles

    // bloque para JSON local
    useEffect(() => {
        setCargando(true)

        fetch("/datos/productos.json") //realiza una solicitud HTTP para obtener el archivo JSON ubicado en la ruta "/datos/productos.json". El método fetch devuelve una promesa que se resuelve con la respuesta de la solicitud.
            .then((respuesta) => respuesta.json()) //convierte -asincrónicamente- el formato JSON para que pueda ser utilizada en el código: de json a javascript
            .then((datos) => setProductos(datos)) //actualiza el estado de productos con los datos obtenidos del JSON, lo que a su vez provoca un re-renderizado del componente para mostrar los productos en la interfaz de usuario
            .catch((error) => console.log("Error al cargar productos", error)) //maneja cualquier error que pueda ocurrir durante la solicitud o el procesamiento de los datos, registrando un mensaje de error en la consola para ayudar a identificar el problema
            .finally(() => { //independientemente de si la solicitud fue exitosa o si ocurrió un error, se ejecuta el bloque dentro de finally, que en este caso establece el estado de cargando a false, indicando que la carga de datos ha finalizado y permitiendo que el componente renderice los productos o muestre un mensaje de error según corresponda.
                setCargando(false)
            })
    }, [])

    console.log(productos)


    // bloque para API
    // useEffect(() => { 
    // fetch ("https://fakestoreapi.com/products")
    // .then((respuesta) => respuesta.json())
    // .then((datos) => setProductos(datos))   
    // .catch((error) => console.log(error))
    // .finally(() => {
    //     setCargando(false)
    // })}, [])



    if (cargando) return <p>Cargando...</p>

    return (

        <section>
            <h2>Productos</h2>
            <ItemList productos={productos} /> 
            {/* //se pasa el estado productos como prop al componente ItemList para que pueda renderizar la lista de productos obtenidos del JSON o de la API */}
        </section>
    );

}

// los contenedores son componentes que se encargan de manejar la lógica y el estado de la aplicación, mientras que los componentes de presentación se encargan de mostrar la interfaz de usuario. En este caso, ItemListContainer es un contenedor que maneja la lógica para obtener la lista de productos y pasar esa información al componente de presentación ItemList, que se encarga de mostrar esos productos al usuario.