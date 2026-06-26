import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";


export const PublicLayOut = () => {
    return (
    <>
        <Header />
        <main>
            <Outlet /> {/* Se renderiza el componente Outlet dentro del componente PublicLayOut, lo que permite que cualquier componente dentro de este componente tenga acceso al estado de autenticación y a la función de carga de productos a través del contexto AuthContexto. */}
        </main>
        <Footer />
    </>
    )
}