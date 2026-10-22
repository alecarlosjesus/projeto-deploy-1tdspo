import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProdutoJ } from "../../types/types";
import { useForm } from "react-hook-form";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditarProdutos() {
  //Modificar o título da página;
  document.title = "Editar Produtos";

  const navigate = useNavigate();

  //Declarando os componentes do hookForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TipoProdutoJ>({
    defaultValues: { id: "", nome: "", preco: 0, estoque: 0, avatar: "" },
    mode: "onChange",
  });

  //Recuperar o parâmetro da rota através do hook useParams, desestruturando o objeto.
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    //Simulando a requisição para o backend

    const carregaProduto = async () => {
      try {
        const resposta = await fetch(`${API_URL}?id=${id}`);

        if (!resposta.ok) {
          throw new Error(
            `Produto não encontrado: ${resposta.status} - ${resposta.statusText}`,
          );
        }

        const resultado = await resposta.json();

        if (resultado.status === "error") {
          throw new Error(resultado.message);
        }

        const dados: TipoProdutoJ = resultado.data;

        console.log(dados);
        reset(dados);
      } catch (error) {
        console.error(error);
      }
    };

    carregaProduto();
  }, []);

  const handleUpdate = async (data: TipoProdutoJ) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({ action: "PUT", ...data }),
      });

      if (!response.ok) {
        throw new Error(
          `A atualização falhou: ${response.status} - ${response.statusText}`,
        );
      }

      const resultado = await response.json();

      if (resultado.status === "error") {
        throw new Error(`A atualização falhou: ${resultado.message}`);
      }

      //MSG de SUCESSO
      alert("Atualização realizada com sucesso!");
      //Redirecionando para a página de produtos
      navigate("/produtos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="pagina pagina-formulario">
      <div className="titulo-pagina">
        <p>Registro Editado</p>
        <h2>Atualização de produto</h2>
      </div>
      <div>
        <form className="forms" onSubmit={handleSubmit(handleUpdate)}>
          <fieldset>
            <legend>Dados do Produto</legend>
            <div className="campo-formulario">
              <label htmlFor="nomeProduto">Nome Produto </label>
              <input
                type="text"
                {...register("nome", {
                  required: "Preenchimento do campo é obrigatório!",
                  minLength: {
                    value: 3,
                    message: "O campo deve conter no mínimo 3 caracteres!",
                  },
                })}
              />
              {errors.nome && (
                <span className="mensagem-erro">{errors.nome.message}</span>
              )}
            </div>
            <div className="campo-formulario">
              <label htmlFor="preco">Preço R$ </label>
              <input
                type="number"
                step={0.1}
                {...register("preco", {
                  required: "Preenchimento do campo é obrigatório!",
                  min: { value: 1, message: "O valor minímo é 1" },
                })}
              />
              {errors.preco && (
                <span className="mensagem-erro">{errors.preco.message}</span>
              )}
            </div>
            <div className="campo-formulario">
              <label htmlFor="estoque">Estoque </label>
              <input
                type="number"
                step={1}
                {...register("estoque", {
                  required: "Preenchimento do campo é obrigatório!",
                  min: { value: 1, message: "O valor minímo é 1" },
                })}
              />
              {errors.estoque && (
                <span className="mensagem-erro">
                  {errors.estoque.message}
                </span>
              )}
            </div>
            <div className="campo-formulario">
              <button type="submit">Editar</button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
