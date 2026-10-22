import { Link } from "react-router";

export default function Menu() {
    return (
        <nav className="menu" aria-label="Navegação Principal">
            <ul>
                <li><Link to="/">Home</Link> | </li>  
                <li><Link to="/produtos">Produtos</Link> | </li>
                <li><Link to="/cad-produto/">Cadastar Produtos</Link></li>
            </ul>
        </nav>
    )
}
