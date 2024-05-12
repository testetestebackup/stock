const listaEquip = document.getElementById('resultado-equipamento')
const select = document.getElementById('selectEquipamento')
const filtroEquip = document.getElementById('idFiltro')
// const estoque = document.getElementById('resultados-estoque')

const resultEquip = getEquipamentos()

resultEquip.then(dados => {
    for(const key in dados) {
        // listaEquip.innerHTML += `<option value="${dados[key].idEquip}">${dados[key].nomeEquip}</option>`
        listaEquip.innerHTML += 
        `
            <ul id = "consulta" class = "ul-result">
                <li class = "li-result poppins-semibold">
                    <div class = "display-line">
                            ID DO TIPO: ${dados[key].idEquip} |
                            NOME: ${dados[key].nomeEquip}        
                    </div>

                    <div class = "display-line">
                        <button id="excluirEquip" class="material-symbols-outlined btn-3" onclick="excluiEquip(event, ${dados[key].idEquip})">
                        delete
                        </button>
                    </div>
                </li>
            </ul>
        `

    }

})

const selectEquipamento = getEquipamentos()

selectEquipamento.then(dados => {
    for(const key in dados){
        select.innerHTML += `<option value="${dados[key].idEquip}">${dados[key].nomeEquip}</option>`
    }
})


const selectFiltro = getEquipamentos()

selectFiltro.then(dados => {
    for(const key in dados){
        filtroEquip.innerHTML += `<option value="${dados[key].idEquip}">${dados[key].nomeEquip}</option>`
    }
})


async function consultaEquip() {
    const filtroEquip = document.getElementById("idFiltro").value;

    let filtros = {};

    if (filtroEquip) {
        filtros.idEquip = filtroEquip;
    }

    try {
        // Consultar dispositivos com os filtros
        let resultado 
        resultado = await consultarEquip({ idEquip });

        // Exibir os resultados da consulta
        exibirEstoque(resultado);
        
        //console.log("Resultado da consulta:");
    } catch (error) {
        console.error("Erro ao consultar dispositivos:", error);
    }
}

function exibirEstoque(resultados) {
    const containerResult = document.getElementById("resultados-estoque");

    // Limpar o conteúdo anterior do container
    containerResult.innerHTML = "";

    // Verificar se há resultados a serem exibidos
    if (resultados && resultados.length > 0) {

        // Criar elementos HTML para cada resultado e adicionar ao container
        resultados.forEach(dados => {
            const resultadoElemento = document.createElement("div");

            resultadoElemento.innerHTML = 
            `
            <ul id = "consulta" class = "ul-result">
                <li class = "li-result poppins-semibold">
                    <div class = "display-line">
                            TIPO: ${dados[key].idEquip} |
                            ID UNICO: ${dados[key].idEstoque} 
                    </div>
                </li>
            </ul>
            `
            ;

            containerResult.appendChild(resultadoElemento);
        });

    } else {

        // Caso não haja resultados, exibir uma mensagem indicando isso
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum resultado encontrado.";
        containerResult.appendChild(mensagem);
        
    }
}




// const exibirEstoque = getEstoque()

// exibirEstoque.then(dados => {
//     for(const key in dados){
//         estoque.innerHTML += 
//         `
//             <ul id = "consulta" class = "ul-result">
//                 <li class = "li-result poppins-semibold">
//                     <div class = "display-line">
//                             TIPO: ${dados[key].idEquip} |
//                             ID UNICO: ${dados[key].idEstoque} 
//                     </div>
//                 </li>
//             </ul>
//         `
//     }
// })

