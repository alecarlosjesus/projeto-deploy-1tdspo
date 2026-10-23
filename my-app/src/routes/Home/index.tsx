import { useEffect, useState } from "react";
import type { TipoUsuarioGit } from "../../types/types";

export default function Home() {

    //Modificar o título da página;
    document.title = "Home";

    const [usuarios, setUsuarios] = useState<TipoUsuarioGit[]>([]);

    useEffect( ()=>{
        //Função assíncrona
        async function loadingData() {
            
            try {
                const response = await fetch("https://api.github.com/users");
                
                if(!response.ok){
                    throw new Error("A listagem falhou!");
                }
                
                const data:TipoUsuarioGit[] = await response.json();
                
                setUsuarios(data);

            } catch (error) {
                console.error(error);
            }
        }

        //Executando a função
        loadingData();
        

    }, []);


    //Guarda o login encontrado na pesquisa individual.
                //setUser atualiza o resultado apresentado na página.
                const [user, setUser] = useState<string>("");

                //Guarda exatamente o texto digitado no campo de pesquisa.
                //setDigitado - função ser usada no onChange do input
                const [digitado, setDigitado] = useState<string>("");


                const buscador = async()=>{

                    //Retira espaços extras do começo e do fim do texto.
                    const nomePesquisado = digitado.trim();

                    //Impede uma consulta vazia
                    if(!nomePesquisado){
                        setUser("Digite um nome de usuário.");
                        return;
                    }

                    try {
                        //Montando a URL utilizando o nome digitado
                        const response = await fetch(`https://api.github.com/users/${nomePesquisado}`);

                        //Gera um erro quando o usuário não é localizado.
                        if(!response.ok){
                            throw new Error(`Usuário não encontrado : ${response.status} - ${response.statusText}`);
                        }

                        //Converter a resposta para o tipo definido no início:
                        const dados:TipoUsuarioGit = await response.json();

                        //Guarda o login encontrado para exibi-lo na página.
                        setUser(dados.login);

                    } catch (error) {
                        //Informa a falha na própria interface
                        setUser("Usuário não encontrado!");
                        console.error(error);
                    }
                }



    return (
        <main className="pagina home">
            <div className="titulo-pagina">
                <p>Consulta de Usuários</p>
                <h2>Github Users</h2>
            </div>
            
            <section className="painel pesquisa" aria-labelledby="titulo-pesquisa">
                <div>
                    <h3 id="titulo-pesquisa">Pesquisar usuário do Github</h3>
                    <p>
                        Informe um nome para realizar a consulta.
                    </p>
                </div>

                <div className="campo-pesquisa">
                    <label htmlFor="nomeUser">
                        Nome de usuário
                    </label>
                    <input type="text" placeholder="Ex.: octocat" onChange={(evento)=> setDigitado(evento.target.value) }/>

                    <button type="button" onClick={buscador}>Pesquisar</button>
                </div>
            </section>

            <p>
                {user && (
                    <p className="resultado-pesquisa">
                        Resultado da pesquisa: <strong>{user}</strong>
                    </p>
                )}
            </p>

                <ul className="grade-usuarios">
                    {usuarios.map( (u,i)=> (

                        <li key={i}className="card-usuario">
                            <img src={u.avatar_url} alt={`Avatar de ${u.login}`}/>
                            <div>
                                <strong>{u.login}</strong>
                                <span>ID: {u.id}</span>
                            </div>
                        </li>
                    ))}
                </ul>

        </main>
    );
}
