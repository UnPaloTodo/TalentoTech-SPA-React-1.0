import { useEffect, useState } from "react"
import { ItemList } from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { getProductosPorCategoria } from "../../servicios/producServic"

export const ItemListContainer = () => {
    const {categoria} = useParams() //se utiliza el hook useParams para obtener el parámetro "categoría" de la URL, lo que permite filtrar los productos por categoría si se proporciona ese parámetro en la ruta.

    const [productos, setProductos] = useState([]) //se define un estado productos que se inicializa como un array vacío, y una función setProductos para actualizar ese estado, lo que permitirá almacenar y gestionar la lista de productos obtenidos del JSON o de la API para su posterior renderizado en el componente ItemList.
    const [cargando, setCargando] = useState(true) //agrega un estado para monitorear la carga de datos antes del renderizado, inicia en true porque al cargar el componente, se asume que los datos aún no están disponibles

    
    useEffect(() => { //se utiliza el hook useEffect para realizar una solicitud a firebase que contiene los datos de los productos, y se actualiza el estado productos con los datos obtenidos. El efecto se ejecuta cada vez que el valor de categoría cambia, lo que permite actualizar la lista de productos mostrados en función de la categoría seleccionada por el usuario en la URL.
        setCargando(true)

    getProductosPorCategoria(categoria)
            .then((datos) => setProductos(datos)) //actualiza el estado de productos con los datos obtenidos de firerase, lo que a su vez provoca un re-renderizado del componente para mostrar los productos en la interfaz de usuario
            .catch((error) => console.log("Error al cargar productos", error)) //maneja cualquier error que pueda ocurrir durante la solicitud o el procesamiento de los datos, registrando un mensaje de error en la consola para ayudar a identificar el problema
            .finally(() => { //independientemente de si la solicitud fue exitosa o si ocurrió un error, se ejecuta el bloque dentro de finally, que en este caso establece el estado de cargando a false, indicando que la carga de datos ha finalizado y permitiendo que el componente renderice los productos o muestre un mensaje de error según corresponda.
                setCargando(false)
            })
    }, [categoria]) //este es el array de dependecia: al agregar "categroria", el efecto de renderizado se ejecuta cada vez que el valor de categoría cambia, lo que permite actualizar la lista de productos mostrados en función de la categoría seleccionada por el usuario en la URL.

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