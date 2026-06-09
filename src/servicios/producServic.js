/*
**	User name
**	Created	6/7/2026
**	producServic.js
*/

import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
import { baseDatos } from "../firebase/firebaseConfig";

const productosCollection = collection(baseDatos, "productos");

//este bloque es para obtener los productos cuando no se trabaja con categorias, es decir, para obtener todos los productos sin filtrar por categoría. 

export const getProductos = async () => { // Se define una función asíncrona getProductos que se encarga de obtener la lista de productos desde la colección "productos" en Firestore. Utiliza un bloque try-catch para manejar posibles errores durante la obtención de los datos. Dentro del bloque try, se utiliza la función getDocs para obtener un snapshot de los documentos en la colección y luego se mapea ese snapshot para crear un array de productos con sus respectivos IDs y datos. Si ocurre un error, se captura en el bloque catch y se registra un mensaje de error en la consola, devolviendo un array vacío como resultado.
    try {
        const snapshot = await getDocs(productosCollection);
        const productos = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return productos;
    } catch (error) {
        console.error("Error al obtener productos: ", error);
        return [];
    }
}

export const getProductoPorId = async (id) => {
    try {
        const productoRef = doc(baseDatos, "productos", id);

        const snapshot = await getDoc(productoRef);

        if (snapshot.exists()) {
            const producto = { id: snapshot.id, ...snapshot.data() };
            console.log("Producto encontrado: ", producto);
            return producto;
        } else {
            console.error("Producto no encontrado");
            return null;
        }
    } catch (error) {
        console.error("Error al obtener producto por ID: ", error);
        return null;
    }
}

export const getProductosPorCategoria = async (categoria) => {//este "categoria" viene de useparams en intemlistcontainer, es el valor que se obtiene de la URL para filtrar los productos por categoría. La función getProductosPorCategoria es asíncrona y se encarga de obtener los productos desde Firestore filtrados por la categoría proporcionada. Utiliza un bloque try-catch para manejar posibles errores durante la obtención de los datos. Dentro del bloque try, se crea una consulta utilizando la función query de Firestore, aplicando un filtro con where para obtener solo los productos que coincidan con la categoría especificada. Luego, se obtiene un snapshot de los documentos que cumplen con esa consulta y se mapea ese snapshot para crear un array de productos con sus respectivos IDs y datos. Si ocurre un error, se captura en el bloque catch y se registra un mensaje de error en la consola, devolviendo un array vacío como resultado.
    try {
        let queryRef

        if (categoria) {//este "categoria" es truthy: si se proporciona una categoría, se crea una consulta que filtra los productos por esa categoría utilizando la función where de Firestore. Si no se proporciona una categoría-undefined-, se obtiene la referencia a toda la colección de productos sin aplicar ningún filtro.
            queryRef = query(productosCollection, where("categoria", "==", categoria));
        }
        else {
            queryRef = productosCollection;
        }

        const snapshot = await getDocs(queryRef);
        const productos = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() }
        });
        return productos;
    } catch (error) {
        console.error("Error al obtener productos por categoría: ", error);
        return [];
    }
}

// export const agregarProducto = async (producto) => {
//     try {
//         const docRef = await addDoc(productosCollection, producto);
//         console.log("Producto agregado con ID: ", docRef.id);
//         return docRef.id;
//     } catch (error) {
//         console.error("Error al agregar producto: ", error);
//         return null;
//     }
// }

/**========================================================================
 *                           ALTA DE PRODUCTOS
 *========================================================================**/

export const agregarProducto = async (datoProducto) => {
    try {
        const docRef = await addDoc(productosCollection, datoProducto);

        return docRef.id;
    } catch (error) {
        console.error("Error al agregar producto: ", error);
        throw error; //ver return null; throw error es mejor porque addDoc es una operación crítica, si falla el componente necesita saberlo para avisarle al usuario. Con return null se pude confundir un error con un ID válido que por alguna razón no llegó. Throw error es la práctica estándar en funciones asíncronas que interactúan con APIs o bases de datos. El return null tiene sentido en funciones de lectura como getProductoPorId, donde "no encontrado" es un resultado válido y no necesariamente un error grave.
    }
}
    