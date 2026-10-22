import type { ReactNode } from "react";

export interface TipoProduto {
    id: number,
    nome: string,
    preco: number,
    estoque: string,
    avatar: string,
}

export interface TipoProdutoAll {
    produto:TipoProduto;
}

export type TipoProdutoJ = {
    id: string;
    nome: string; 
    preco: number;
    estoque: number;
    avatar: string;
}

export type Tema = 'light' | 'dark';

export type TipoTemaContext = {
  tema: Tema;
  alternarTema: ()=> void;
};

export type TipoTemaProps = {
    children: ReactNode;
}