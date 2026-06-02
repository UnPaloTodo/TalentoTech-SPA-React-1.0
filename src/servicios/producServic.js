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
        }} catch (error) {
        console.error("Error al obtener producto por ID: ", error);
        return null;
    }
}

export const getProductosPorCategoria = async (categoria) => {
    try {
        let queryRef

        if (categoria) {
            queryRef = query(productosCollection, where("categoria", "==", categoria));
        }
            else {
                queryRef = productosCollection;
            }

        const snapshot = await getDocs(queryRef);
        const productos = snapshot.docs.map((doc) => {
            return {id: doc.id, ...doc.data()}
        });
        return productos;
    } catch (error) {
        console.error("Error al obtener productos por categoría: ", error);
        return [];
    }}



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