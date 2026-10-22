import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export default function Produtos() {
  //Modificar o título da página;
  document.title = "Produtos";

  //Criando o recipiente da lista de dados e tipando com o tipo de produto
  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  useEffect(() => {
    //Simulando a requisição para o backend

    const carregaProdutos = async () => {
      try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
          throw new Error(
            `Erro na listagem de produtos: ${resposta.status} - ${resposta.statusText}`,
          );
        }

        const resultado = await resposta.json();
        const { data, status } = resultado;

        if (status === "error") {
          throw new Error(`Erro na listagem de produtos: ${status}`);
        }
        console.log(data);
        setProdutos(data);
      } catch (error) {
        console.error(error);
      }
    };

    carregaProdutos();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmou: boolean = window.confirm(
      "Deseja realmente excluir este produto?",
    );

    if (!confirmou) {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          action: "DELETE",
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `A exclusão falhou: ${response.status} - ${response.statusText}`,
        );
      }

      const resultado = await response.json();

      if (resultado.status === "error") {
        throw new Error(resultado.message);
      }

      //MSG de SUCESSO
      alert("O produto foi excluído com sucesso!");
      //Recarregar a lista de produtos após a exclusão, utilizando o filtro para remover o produto excluído do estado
      setProdutos((prevProdutos) =>
        prevProdutos.filter((produto) => produto.id.toString() !== id),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="pagina produtos">
      <div className="titulo-pagina">
        <p>Gerenciamento</p>
        <h2>Produtos cadastrados</h2>
      </div>

    <div className="painel tabela-responsiva">
      <table className="tbProduto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Avatar</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{Number(p.preco.toFixed(2)).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</td>
              <td> <span className="estoque">{p.estoque}</span> </td>
              <td> <img className="avatar-produto" src={p.avatar} alt={p.nome} /> </td>
              <td className="acoes">
                <Link className="editar"  aria-label={`Editar  ${p.nome}`} to={`/editar-produtos/${p.id}`}>Editar</Link> |{" "}
                <Link className="excluir" aria-label={`Excluir ${p.nome}`} to="#" onClick={() => handleDelete(p.id.toString())}>
                  Excluir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>Quantidade de produtos - {produtos.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    </main>
  );
}
