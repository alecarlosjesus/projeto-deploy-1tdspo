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


export type TipoUsuarioGit = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin:boolean;
}
