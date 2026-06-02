
import { Header } from "./componentes/Header/Header";
import { Footer } from "./componentes/Footer/Footer";
import { ItemListContainer } from "./componentes/ItemListContainer/ItemListContainer";
import { Route, Routes } from "react-router-dom";
import { ItemDetailContainer } from "./componentes/ItemDetailContainer/ItemDetailContainer";
import { Contador } from "./componentes/Contador/Contador";
import { Cart } from "./componentes/Carro/Carro";
import "./App.css";


function App() {
    "todo lo que se monta en App.jsx (dentro de return) se va a mostrar en la página"

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<ItemListContainer />} />
                    <Route path="/categoria/:categoria" element={<ItemListContainer />} />
                    <Route path="/producto/:id" element={<ItemDetailContainer />} />
                    <Route path="/carrito" element={<Cart />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App /* Se importa el componente Header, Footer, ItemListContainer, ItemDetailContainer, Contador y Cart desde sus respectivas rutas. También se importa el archivo de estilos App.css. Se define la función App que retorna un fragmento JSX que incluye el Header, un main con las rutas definidas para mostrar el ItemListContainer en la ruta raíz "/", el ItemDetailContainer en la ruta "/producto/:id" y el Cart en la ruta "/carrito". Finalmente, se exporta el componente App como predeterminado. */


/* ASCII: alt 91 = [
        alt 93 = ]
        alt 123 = {
        alt 125 = }
        alt 34 = "
        alt 39 = ' 
        alt 96 = ` 
        alt 92 = \
        alt 40 = @
        alt 41 = #
        alt 38 = &
        alt 60 = <
        alt 62 = >
        alt 43 = +
        alt 45 = -
        alt 61 = =
        alt 47 = /
        alt 124 = |
        alt 126 = ~
*/