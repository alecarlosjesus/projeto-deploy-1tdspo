import { useContext } from "react";
import Menu from "../Menu/Menu";
import { TemaContext } from "../../contexts/TemaContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Cabecalho() {

  const{tema,alternarTema} = useContext(TemaContext);


  return (
    <header>
        <h1>Mesbla</h1>

        <Menu/>
        <button type="button" onClick={alternarTema}>
          {tema === "light" ? <FaMoon/> : <FaSun/>}
          {tema === "light" ? "Tema escuro" : "Tema claro"}
        </button>
    </header>
  )
}
