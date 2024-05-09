function excluiEquip(event){
    event.preventDefault()
    console.log(idEquip)
    deletaEquip(event.value)
        .then(response => {
            console.log("Item excluido!!", response);
            // Você pode adicionar aqui o que deseja fazer após a exclusão do dispositivo
        })
        .catch(error => {
            console.error("Erro ao excluir item:", error);
            // Você pode adicionar aqui o tratamento de erro adequado
        });
}