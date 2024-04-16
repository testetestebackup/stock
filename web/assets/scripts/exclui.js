const excluirDispositivo = (tombamento) => {

    deletaDisp(tombamento)
        .then(response => {
            console.log("Dispositivo excluido!!", response);
            // Você pode adicionar aqui o que deseja fazer após a exclusão do dispositivo
        })
        .catch(error => {
            console.error("Erro ao excluir dispositivo:", error);
            // Você pode adicionar aqui o tratamento de erro adequado
        });
}
