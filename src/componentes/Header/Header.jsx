import "./Header.css";
import { Nav } from '../Nav/Nav';
import logo from "../../assets/react.svg";
import { Link } from "react-router-dom";


export const Header = () => { // Se define el componente funcional Header que retorna un fragmento JSX que representa la estructura del encabezado de la página, incluyendo un contenedor para el logo con un enlace a la página principal y el componente Nav para la barra de navegación. El logo se importa desde la ruta "../../assets/react.svg" y se muestra junto con el nombre "Frutería Reactiva". El componente Nav se incluye para mostrar los enlaces de navegación en el encabezado.
    return (
        <header>
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} />
                    <span>Frutería Reactiva</span>
                </Link>
            </div>
            <Nav />
        </header>
    )
}        