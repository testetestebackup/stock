const input = document.getElementById("tombamentoInput2");

async function main() {
    const filtroStatus = document.getElementById("filtroStatus").value;
    const filtroIdUnidade = document.getElementById("filtroIdUnidade").value;
    const tombamento = document.getElementById("tombamentoInput2").value.trim();

    let filtros = {};

    if (filtroStatus) {
        filtros.status = filtroStatus;
    }

    if (filtroIdUnidade) {
        filtros.idUnidade = filtroIdUnidade;
    }

    try {
        let resultado;
        if (tombamento) {
            // Se houver um tombamento, usa-o como filtro
            resultado = await consultarDisp({ tombamento });
        } else {
            // Caso contrário, usa os filtros padrão
            resultado = await consultarDisp(filtros);
        }
        
        // Exibir os resultados da consulta
        exibirResultados(resultado);
        
        console.log("Resultado da consulta:", resultado);
    } catch (error) {
        console.error("Erro ao consultar dispositivos:", error);
    }
}


function exibirResultados(resultados) {
    const containerResultados = document.getElementById("resultados");

    // Limpar o conteúdo anterior do container
    containerResultados.innerHTML = "";

    // Verificar se há resultados a serem exibidos
    if (resultados && resultados.length > 0) {

        // Criar elementos HTML para cada resultado e adicionar ao container
        resultados.forEach(resultado => {
            const resultadoElemento = document.createElement("div");

            resultadoElemento.innerHTML = 
            `
            <ul id="consulta" class = "ul-result">
                <li class = "li-result">
                    <div class = "display-line">
                        Tomb: ${resultado.tombamento} |
                        Desc: ${resultado.descricao} | 
                        Status: ${resultado.idEstado} | 
                        Unidade: ${resultado.idUnidade} | 
                        Tipo: ${resultado.idTipo} | 
                    </div>
                        
                    <div class = "display-line">
                        <button id="excluir" class="material-symbols-outlined btn-3" onclick="excluirDispositivo(${resultado.tombamento})">
                        delete
                        </button>
                        <a href="atualizar.html?tombamento=${resultado.tombamento}" class="material-symbols-outlined btn-4 a-1">
                        edit
                        </a>
                    </div>
                </li>
            </ul>
            `
            ;

            containerResultados.appendChild(resultadoElemento);
        });

    } else {

        // Caso não haja resultados, exibir uma mensagem indicando isso
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum resultado encontrado.";
        containerResultados.appendChild(mensagem);
        
    }
}

input.addEventListener("keyup", main)



// const ul = document.getElementById("consulta")

// async function main() {
//     const res = await consultarDisp()
    
//     const li = res.map((dados) => {
//         return `
//             <li>
//                 <h1>${dados.descricao}</h1>
//             </li>
//             `
//     })

//     ul.innerHTML = li;
// };

// main()

