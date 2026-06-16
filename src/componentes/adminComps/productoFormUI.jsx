export const ProductoFormUI = ({
producto, 
errors, 
loading, 
onChange, 
onFileChange, 
onSubmit}) => {
    return (
        <section>
            <form className="product-form" onSubmit={onSubmit}>
                <h2>Agregar producto nuevo</h2>

                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={producto.nombre} 
                        onChange={onChange} 
                    />
                    {errors.nombre && <p className="error">{errors.nombre}</p>} {/* Si hay un error asociado al campo nombre, se muestra un mensaje de error debajo del input. */}
                </div>

                <div>
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="precio" 
                        value={producto.precio} 
                        onChange={onChange} 
                        min="0" /* Se establece el atributo min en 0 para evitar que el usuario ingrese un precio negativo. */
                    />
                    {errors.precio && <p className="error">{errors.precio}</p>} {/* Si hay un error asociado al campo precio, se muestra un mensaje de error debajo del input. */}
                </div>

                <div>
                    <label>Categoría:</label>
                    <input 
                        type="text" 
                        name="categoria" 
                        value={producto.categoria} 
                        onChange={onChange} 
                    />
                    {errors.categoria && <p className="error">{errors.categoria}</p>} {/* Si hay un error asociado al campo categoria, se muestra un mensaje de error debajo del input. */}
                </div>

                <div>
                    <label>Descripción:</label>
                    <textarea 
                        name="descripcion" 
                        value={producto.descripcion} 
                        onChange={onChange} 
                    />
                    {errors.descripcion && <p className="error">{errors.descripcion}</p>} {/* Si hay un error asociado al campo descripcion, se muestra un mensaje de error debajo del textarea. */}
                </div>

                <div>
                    <label>Imagen:</label>
                    <input type="file" accept="image/*" onChange={onFileChange} /> {/* Se agrega un input de tipo file para que el usuario pueda seleccionar una imagen. El atributo accept se establece en "image/*" para limitar la selección a archivos de imagen. La función onFileChange se llama cada vez que el usuario selecciona un archivo. */}
                    {errors.file && <p className="error">{errors.file}</p>} {/* Si hay un error asociado al campo file, se muestra un mensaje de error debajo del input. */}
                </div>

                <button className="btn" type="submit" disabled={loading}> {/* El botón de submit se deshabilita mientras el formulario está en proceso de envío (loading es true) para evitar envíos múltiples. */}
                    {loading ? "Guardando..." : "Guardar Producto"} {/* El texto del botón cambia a "Guardando..." mientras el formulario está en proceso de envío (loading es true) para indicar al usuario que se está guardando el producto. */}
                </button>
                {errors.general && <p className="error">{errors.general}</p>} {/* Si hay un error general (no asociado a un campo específico), se muestra un mensaje de error debajo del botón. */}
            </form>
        </section>
    )
}
