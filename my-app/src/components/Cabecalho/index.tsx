import { useContext } from "react";
import Menu from "../Menu/Menu";
import { TemaContext } from "../../contexts/TemaContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Cabecalho() {

  const{tema,alternarTema} = useContext(TemaContext);


  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">

        <div className="marca">
          <h1>Gerenciador de Produtos</h1>
          <p>Utensílios em geral</p>
        </div>

        <Menu/>

        <button 
          type="button" 
          className="bota-tema"
          onClick={alternarTema}
          aria-label={tema === "light" ? "Ativar tema escuro" : "Ativar tema claro"}>
          {tema === "light" ? <FaMoon/> : <FaSun/>}
          {tema === "light" ? "Tema escuro" : "Tema claro"}
        </button>

      </div>
    </header>
  )
}
