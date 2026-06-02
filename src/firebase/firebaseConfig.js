// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOPQ0PAD-Rhifzi7bhKWXbGXf6cI--XRQ",
    authDomain: "fruta-reactiva.firebaseapp.com",
    projectId: "fruta-reactiva",
    storageBucket: "fruta-reactiva.firebasestorage.app",
    messagingSenderId: "746042304806",
    appId: "1:746042304806:web:7c731f16c4eec5967979e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const baseDatos=getFirestore (app);

// export default baseDatos; // Se importa la función initializeApp desde el SDK de Firebase y getFirestore para obtener una instancia de Firestore. Se define la configuración de Firebase con las credenciales proporcionadas. Luego, se inicializa la aplicación de Firebase con la configuración y se obtiene una instancia de Firestore que se asigna a la variable baseDatos. Finalmente, se exporta baseDatos como el valor predeterminado del módulo.
export {baseDatos}; // Se exporta baseDatos como una exportación nombrada, lo que permite importar esta variable en otros archivos utilizando la sintaxis de importación nombrada.

// const auth= getAuth(app); // Se obtiene una instancia de autenticación de Firebase utilizando la función getAuth y se asigna a la variable auth. Esto permite gestionar la autenticación de usuarios en la aplicación.
// export {auth}; // Se exporta auth como una exportación nombrada, lo que permite importar esta variable en otros archivos utilizando la sintaxis de importación nombrada.