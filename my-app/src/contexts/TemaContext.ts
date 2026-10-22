import { createContext } from "react";
import type { TipoTemaContext } from "../types/types";

export const TemaContext = createContext<TipoTemaContext>({
    tema:"light",
    alternarTema: ()=> {},
});