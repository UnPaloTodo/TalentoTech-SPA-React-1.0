export const validarProducto = (producto) => {

    const error = {};

    if (!producto.nombre || producto.nombre.trim() === "") {
        error.nombre = "El nombre del producto es obligatorio.";
    }

    if (!producto.precio || isNaN(producto.precio) || producto.precio <= 0) {
        error.precio = "El precio del producto debe ser un número positivo.";
    }

    if (!producto.categoria || producto.categoria.trim() === "") {
        error.categoria = "La categoría del producto es obligatoria.";
    }

    if (!producto.descripcion || producto.descripcion.trim() === "") {
        error.descripcion = "La descripción del producto es obligatoria.";
    }

    if (!producto.imagen || producto.imagen.trim() === "") {
        error.imagen = "La URL de la imagen del producto es obligatoria.";
    }

    return error;
}