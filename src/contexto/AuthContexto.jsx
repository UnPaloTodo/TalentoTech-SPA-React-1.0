import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


// Se crea un contexto -AuthContexto- para la autenticación de usuarios (para compartir el estado de autenticación entre componentes sin necesidad de pasar props manualmente a cada nivel)
const AuthContexto = createContext();

//custom hook para usar el contexto de autenticación
export const useAuth = () => { // Se exporta un hook personalizado -useAuth- que permite a los componentes acceder al contexto de autenticación de manera más sencilla, evitando la necesidad de importar useContext y AuthContexto en cada componente que necesite acceder a la autenticación.
    const contexto = useContext(AuthContexto)

    if (!contexto) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider")

    }
    return contexto
}

export const AuthProvider = ({ children }) => { // Se crea un componente proveedor -AuthProvider- que envuelve a los componentes hijos-children y proporciona el estado de autenticación a través del contexto.
    const { user, setUser } = useState(null); // Se utiliza el hook useState para crear un estado local -user- que representa al usuario autenticado, inicialmente establecido en null.
    const { loading, setLoading } = useState(true); // Se utiliza el hook useState para crear un estado local -loading- que representa si la autenticación está en proceso, inicialmente establecido en true.

    useEffect(() => { // Se utiliza el hook useEffect para realizar una acción secundaria después de que el componente se haya montado, en este caso, para verificar si el usuario ya está autenticado.
        const unSubscribe = onAuthStateChanged(auth, (firebaseuser) => { // Se utiliza la función onAuthStateChanged para escuchar los cambios en el estado de autenticación del usuario. Esta función recibe el objeto auth y una función de callback que se ejecuta cada vez que cambia el estado de autenticación.
            setUser(firebaseuser); // Se actualiza el estado user con la información del usuario autenticado proporcionada por Firebase.
            setLoading(false); // Se establece el estado loading en false, indicando que la verificación de autenticación ha finalizado.
        });

        return unSubscribe

    }, [])

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        try {
            await signOut(auth)
        }
        catch (error) {
            console.error("Error al cerrar sesión", error)
        }
    }

    return (
        <AuthContexto.Provider value={{ user, loading, login, logout }}>
            {children} {/* Se renderizan los componentes hijos dentro del proveedor de autenticación, lo que permite que cualquier componente dentro de este proveedor tenga acceso al estado de autenticación a través del contexto. */}
        </AuthContexto.Provider>
    )
}
