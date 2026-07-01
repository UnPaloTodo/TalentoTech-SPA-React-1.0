import "./Item.css";

export const Item = ({nombre, descripcion, precio, imagen, children}) => { // El componente Item recibe varias props: nombre, descripción, precio, imagen y children. Estas props se utilizan para mostrar la información del producto en una tarjeta. El componente renderiza una estructura HTML que incluye una imagen del producto, su nombre, su precio y cualquier contenido adicional que se pase como children (como la descripción o el contador de cantidad). La clase CSS "card" se aplica al artículo para darle estilo a la tarjeta del producto.

    return (
        <article className="card">
            <img src={imagen}/>
            <h3>{nombre}</h3>
            <p>$ {precio} por kilo</p>
            {children}
        </article>
    );

}

