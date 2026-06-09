import "./Footer.css" // "así se importa el css del footer; se puede importar con cualquier nombre pero es recomendable usar el mismo nombre del componente para evitar confusiones"


export const Footer = () => {
    return (
        <footer>
            <p>Powered by Talento Tech</p>
            <nav>
                <ul className="nav-list">
                    <li>Wasap</li>
                    <li>Email</li>
                </ul>
            </nav>
        </footer>
    )
}