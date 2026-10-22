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
          action: "DELETE",    id: id, }), 
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
      setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.id.toString() !== id));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <h2>Produtos</h2>

      <table
        border={1}
        cellPadding={10}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#2c3e50", color: "#ffffff" }}>
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
              <td>{p.preco}</td>
              <td>{p.estoque}</td>
              <td>
                <img
                  src={p.avatar}
                  alt={p.nome}
                  width={60}
                  height={60}
                  style={{ objectFit: "cover" }}
                />
              </td>
              <td>
                <Link to={`/editar-produtos/${p.id}`}>Editar</Link> |{" "}
                <Link to="#" onClick={() => handleDelete(p.id.toString())}>
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
    </main>
  );
}
