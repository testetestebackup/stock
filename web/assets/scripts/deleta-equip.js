// const excluiEquip = (idEquip) => {
//     console.log(idEquip)
//     deletaEquip(idEquip)
//         .then(response => {
//             console.log("Item excluido!!", response);
//             // Você pode adicionar aqui o que deseja fazer após a exclusão do dispositivo
//         })
//         .catch(error => {
//             console.error("Erro ao excluir item:", error);
//             // Você pode adicionar aqui o tratamento de erro adequado
//         });
// }

const excluiEquip = (event, idEquip) => {
    event.preventDefault()
    console.log(idEquip);

    deletaEquip(idEquip)
    .catch(error => {
        console.error("Erro ao excluir item:", error);
        // Você pode adicionar aqui o tratamento de erro adequado
    });
}



