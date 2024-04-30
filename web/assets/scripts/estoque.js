const listaEquip = document.getElementById('resultado-equipamento')

const resultEquip = getEquipamentos()

resultEquip.then(dados => {
    console.log(dados)
    for(key) in  fiz desse jeito e nao pegou, com for e etc ai tentei desse jeito aqui
    dados.forEach(  => {
        listaEquip.innerHTML += 
        `
            <ul id="" class = "ul-result">
                    <li class = "li-result iten-list poppins-semibold">
                        <div class = "display-line">
                            Id: ${idEquip} | ${nomeEquip}
                        </div>
                            
                        <div class = "display-line">
                            <button id="excluir" class="material-symbols-outlined btn-3" onclick="excluirDispositivo(${resultado.tombamento})">
                            delete
                            </button>
                        </div>
                    </li>
                </ul>
        `
    })
}).catch(error => {
    console.log('Erro ao buscar equipamentos', error);
})