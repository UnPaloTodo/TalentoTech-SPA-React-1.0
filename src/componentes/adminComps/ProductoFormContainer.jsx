import "./productoFormContainer.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ProductoFormUI } from "./ProductoFormUI"
import { validarProducto } from "../../utilitarios/validarProducto"
import { subirImagen } from "../../servicios/subirImagen"
import { agregarProducto } from "../../servicios/producServic"


export const ProductoFormContainer = () => {
    const navigate = useNavigate() /* Se importa el hook useNavigate -navegación programática- desde react-router-dom para poder redirigir al usuario a otra ruta después de realizar una acción.  */

    const [loading, setLoading] = useState(false) /* Se define un estado loading para controlar si el formulario está en proceso de envío. */

    const [errors, setErrors] = useState({}) /* Se define un estado error para almacenar cualquier error que pueda ocurrir durante el proceso de envío del formulario. Vinculado con validarProducto */

    const [file, setFile] = useState(null) /* Se define un estado file para almacenar el archivo de imagen seleccionado por el usuario. */

    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        categoria: "",
        descripcion: "",
    }) /* Se define un estado producto para almacenar los datos del producto que se están ingresando en el formulario. Inicialmente, todos los campos están vacíos. */

    const handleChange = (e) => {
        const { name, value } = e.target /* Se define la función handleChange que se encargará de actualizar el estado producto cada vez que el usuario ingrese datos en el formulario. Esta función recibe un evento e, del cual se extraen el nombre del campo (name) y su valor (value). */
        setProducto({ ...producto, [name]: value }) /* Se actualiza el estado producto utilizando el operador spread para mantener los valores anteriores y se actualiza el campo correspondiente al nombre del input que se está modificando. */
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0] || null
        setFile(file) /* Se extrae el archivo seleccionado por el usuario del evento e. Se accede a la propiedad files del target del evento, que es un array de archivos, y se toma el primer archivo (index 0) ya que se espera que solo se seleccione un archivo. */
    } //Se define la función handleFileChange que se encargará de actualizar el estado file cada vez que el usuario seleccione un archivo de imagen. Esta función recibe un evento e, del cual se extrae el archivo seleccionado y se actualiza el estado file con ese archivo.

    const handleSubmit = async (e) => {
        e.preventDefault() /* Se define la función handleSubmit que se encargará de manejar el envío del formulario. Esta función recibe un evento e, del cual se previene el comportamiento por defecto para evitar que la página se recargue al enviar el formulario. */
        console.log("submit disparado") // para ver en la consola cuándo se envía el formulario
        setErrors({}) /* Se limpia el estado errors antes de realizar la validación del formulario para asegurarse de que no se muestren errores anteriores. */
        setLoading(true) /* Se establece el estado loading en true para indicar que el formulario está en proceso de envío. */

        //validar el producto antes de enviarlo al servidor
        const nuevoError = validarProducto({ ...producto, file }) /* Se llama a la función validarProducto, pasando un objeto que combina los datos del producto con el archivo seleccionado. Esta función se encargará de validar los datos ingresados y devolverá un objeto con los errores encontrados, si los hay. */
        if (Object.keys(nuevoError).length > 0) {
            setErrors(nuevoError) /* Si se encuentran errores en la validación, se actualiza el estado errors con el objeto de errores devuelto por validarProducto. Esto permitirá mostrar los mensajes de error correspondientes en el formulario. */
            console.log("errores:", nuevoError) // para ver en la consola los errores
            setLoading(false)
            return /* Si hay errores, se detiene la ejecución de la función handleSubmit para evitar que se realicen las acciones de envío del formulario. */
        }

        //subir la imagen a un servicio de almacenamiento y obtener la URL de la imagen
        try {
            const imagenUrl = await subirImagen(file) /* Se define una función asíncrona subirImagen que se encargará de subir la imagen seleccionada por el usuario a un servicio de almacenamiento y obtener la URL de la imagen resultante. Se llama a esta función pasando el archivo almacenado en el estado file y se espera su resultado utilizando await. La URL de la imagen obtenida se almacena en la variable imageUrl. */

            //armar el objeto del producto con la URL de la imagen obtenida
            const productoConImagen = {
                ...producto,
                price: Number(producto.precio),
                imagen: imagenUrl
            } /* Se crea un nuevo objeto productoConImagen que combina los datos del producto con la URL de la imagen obtenida. Se utiliza el operador spread para mantener los valores anteriores del producto y se actualiza el campo precio convirtiéndolo a un número utilizando Number, y se agrega el campo imagen con la URL obtenida. */

            //alta del producto en la base de datos, incluyendo la URL de la imagen obtenida en el paso anterior
            const idProducto = await agregarProducto(productoConImagen) /* Se define una función asíncrona guardarProducto que se encargará de guardar el producto en la base de datos, incluyendo la URL de la imagen obtenida en el paso anterior. Se llama a esta función pasando el objeto productoConImagen y se espera su resultado utilizando await. El ID del producto guardado se almacena en la variable idProducto. */

            //vaciar el formulario y redirigir al usuario a la página de éxito o al listado de productos después de que el producto se haya guardado correctamente.
            setProducto({
                nombre: "",
                precio: "",
                categoria: "",
                descripcion: "",
            }) /* Se vacía el estado producto para limpiar el formulario después de que el producto se haya guardado correctamente. */
            setFile(null)
            navigate(`/admin/producto/suceso/${idProducto}`, { replace: true }) /* Se utiliza la función navigate para redirigir al usuario a la página de éxito o al listado de productos después de que el producto se haya guardado correctamente. En este caso, se redirige a la ruta "/suceso/:id" pasando el ID del producto guardado como parámetro en la URL. La opción {replace: true} se utiliza para reemplazar la entrada actual en el historial del navegador, evitando que el usuario pueda volver a la página del formulario utilizando el botón de retroceso. */
        } catch (error) {
            setErrors({ general: error.message }) /* Si ocurre algún error durante el proceso de subida de la imagen o guardado del producto, se actualiza el estado errors con un mensaje de error genérico para informar al usuario que ocurrió un problema. */
        } finally {
            setLoading(false) /* Finalmente, se establece el estado loading en false para indicar que el proceso de envío del formulario ha finalizado, independientemente de si fue exitoso o si ocurrió un error. */
        }
    }


    return (
        <ProductoFormUI  /* Se retorna el componente ProductoFormUI, que es el componente de presentación que se encargará de mostrar el formulario al usuario. Este componente recibirá las props necesarias para manejar el estado y las acciones del formulario. */
            producto={producto} // estado
            errors={errors} // estado 
            loading={loading} // estado
            onChange={handleChange} /* Se pasa la función handleChange como prop onChange al componente ProductoFormUI. Esta función se encargará de actualizar el estado producto cada vez que el usuario ingrese datos en el formulario. Evento. Función.*/
            onFileChange={handleFileChange} /* Se pasa la función handleFileChange como prop onfileChange al componente ProductoFormUI. Esta función se encargará de actualizar el estado file cada vez que el usuario seleccione un archivo de imagen. Evento. Función.*/
            onSubmit={handleSubmit} /* Se pasa la función handleSubmit como prop onSubmit al componente ProductoFormUI. Esta función se encargará de manejar el envío del formulario, validar los datos ingresados y realizar las acciones necesarias para guardar el producto. Evento. Función.*/
        />)
}