// Captura os elementos HTML relevantes
const tombamentoInput = document.getElementById('tombamentoInput3');
const descricaoInput = document.getElementById('descricaoInput2');
const statusSelect = document.getElementById('atualizaStatus');
const unidadeSelect = document.getElementById('atualizaIdUnidade');

// Função para executar a atualização do dispositivo
const atualizarDispositivo = (event) => {
    event.preventDefault();
    // Obtém os valores dos campos do formulário
    const tombamento = tombamentoInput.value;
    const descricao = descricaoInput.value;
    const idEstado = statusSelect.value;
    const idUnidade = unidadeSelect.value;
    
    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!tombamento || !descricao || !idEstado || !idUnidade) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Chama a função para atualizar o dispositivo na API
    atualizaDisp(tombamento, descricao, idEstado, idUnidade)
    .then(data => {
        // Se a atualização for bem-sucedida, exibe uma mensagem
        console.log('Dispositivo atualizado com sucesso:', data);
        alert('Dispositivo atualizado com sucesso!');
        // Limpa os campos do formulário após a atualização
        tombamentoInput.value = '';
        descricaoInput.value = '';
        statusSelect.value = '';
        unidadeSelect.value = '';
    })
    .catch(error => {
        // Se ocorrer algum erro na atualização, exibe uma mensagem de erro
        console.error('Erro ao atualizar dispositivo:', error);
        alert('Erro ao atualizar dispositivo. Por favor, tente novamente.');
    });
    
};

// Adiciona um event listener para o botão de atualizar

document.getElementById('atualizar').addEventListener('click', atualizarDispositivo);