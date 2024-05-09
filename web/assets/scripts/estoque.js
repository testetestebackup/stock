const listaEquip = document.getElementById('resultado-equipamento')
const select = document.getElementById('selectEquipamento')
const filtro = document.getElementById('idFiltro')
const estoque = document.getElementById('resultados-estoque')

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
                        <button id="excluirEquip" class="material-symbols-outlined btn-3" onclick="excluiEquip(${dados[key].idEquip})">
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
        filtro.innerHTML += `<option value="${dados[key].idEquip}">${dados[key].nomeEquip}</option>`
    }
})


const exibirEstoque = getEstoque()

exibirEstoque.then(dados => {
    for(const key in dados){
        estoque.innerHTML += 
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
    }
})

