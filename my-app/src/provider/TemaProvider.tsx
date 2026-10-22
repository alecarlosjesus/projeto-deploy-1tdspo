import { useState } from "react";
import type { Tema, TipoTemaProps } from "../types/types";
import { TemaContext } from "../contexts/TemaContext";


export function TemaProvider({children}:TipoTemaProps){

    const [tema, setTema] = useState<Tema>("light");

    const alternarTema = ()=>{
        if(tema === "light"){
            setTema("dark");
        }else{
            setTema("light");
        }
    }

    return(
        <TemaContext.Provider value={{tema, alternarTema}}>
            {children}
        </TemaContext.Provider>
    );
}