// Função para adicionar dispositivo

const adicionaDispositivo = (event) => {
    event.preventDefault() 
    
    // Captura os valores dos campos do formulário
    const tombamento = document.getElementById('tombamentoInput').value;
    const descricao = document.getElementById('descricaoInput').value;
    const idEstado = document.getElementById('estadoInput').value;
    const idUnidade = document.getElementById('unidadeInput').value;
    const idTipo = document.getElementById('tipoInput').value;
    
    // Chama a função para adicionar dispositivo com os valores capturados
    const resultado = adicionaDisp(tombamento, descricao, idEstado, idUnidade, idTipo);
    
    // Exibe uma mensagem de sucesso ou erro (se desejar)
    console.log(resultado);
}

// Adiciona um evento de clique ao botão de envio
document.getElementById('cadastrarDispositivo').addEventListener('click', adicionaDispositivo);

const select = document.getElementById('unidadeInput')

const selectUnidade = getUnidade()

selectUnidade.then(dados => {
    for (const key in dados) {
        select.innerHTML += `<option value="${dados[key].idUnidade}">${dados[key].nomeUnidade}</option>`
    }

})