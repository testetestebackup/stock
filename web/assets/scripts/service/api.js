const baseUrl = "http://localhost:3300"

const consultarDisp = (filtros) => {
    let url = `${baseUrl}/dispositivos`;
    // Se houver filtros, adiciona à URL
    if (filtros) {
        // Verifica se há um tombamento na consulta
        if (filtros.tombamento) {
            url += `/dispositivos/${filtros.tombamento}`; // Adiciona o tombamento à URL
        } else {
            url += '?' + Object.keys(filtros).map(key => `${key}=${filtros[key]}`).join('&');
        }
    }

    return fetch(url, { method: "GET" })
        .then(res => res.json())
        .then(res => res);
}


const adicionaDisp = (tombamento, descricao, idEstado, idUnidade, idTipo) => {
    const data = {tombamento, descricao, idEstado, idUnidade, idTipo}
    const body = JSON.stringify(data)
    fetch(`${baseUrl}/dispositivos`,
    {
        method: 'POST',
        headers: 
        {
        'Content-Type': 'application/json'
        },
        body
    })
    return "ok!"
}

//atualizar dispositivo
const atualizaDisp = (tombamento, descricao, idEstado, idUnidade, idTipo) => {
    const info = { descricao, idEstado, idUnidade, idTipo };

    return fetch(`${baseUrl}/dispositivos/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao atualizar dispositivo');
        }
        return res.json();
    })
    .then(data => data)
    .catch(error => console.error('Erro:', error));
}


//deletar dispositivo
const deletaDisp = (tombamento) => {

}