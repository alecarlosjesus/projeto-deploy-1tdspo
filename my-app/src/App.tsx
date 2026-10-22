import { Outlet } from "react-router";
import Cabecalho from "./components/Cabecalho";
import Rodape from "./components/Rodape";
import { useContext } from "react";
import { TemaContext } from "./contexts/TemaContext";

export default function App() {

    const{ tema } = useContext(TemaContext);

  return (
    <div className={`container ${tema}`}>
            <Cabecalho />
              <Outlet/>
            <Rodape />
    </div>
  )
}
