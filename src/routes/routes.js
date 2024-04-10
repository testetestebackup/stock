const express = require('express');
const connect = require('../db/connect'); // Importe a conexão do banco de dados

const router = express.Router();

// // Rota para obter todos os dispositivos
// router.get('/', (req, res) => {
//     connect.query("SELECT * FROM dispositivos", (err, rows) => {
//         if (err) {
//             console.error("Erro ao obter dispositivos:", err);
//             res.status(500).json({ error: "Erro interno do servidor" });
//             return;
//         }
//         console.log(rows)
//         res.json(rows);
//     });
// });

router.get('/', (req, res) => {
    const { idEstado, idUnidade, status } = req.query;

    let query = "SELECT * FROM dispositivos";

    if (idEstado) {
        query += ` WHERE idEstado = ${idEstado}`;
    }

    if (idUnidade) {
        if (query.includes("WHERE")) {
            query += ` AND idUnidade = ${idUnidade}`;
        } else {
            query += ` WHERE idUnidade = ${idUnidade}`;
        }
    }

    if (status) {
        let estadoId;
        switch (status) {
            case 'operantes':
                estadoId = 1;
                break;
            case 'inoperantes':
                estadoId = 2;
                break;
            case 'manutencao':
                estadoId = 3;
                break;
            default:
                estadoId = null;
        }

        if (estadoId !== null) {
            if (query.includes("WHERE")) {
                query += ` AND idEstado = ${estadoId}`;
            } else {
                query += ` WHERE idEstado = ${estadoId}`;
            }
        }
    }

    connect.query(query, (err, rows) => {
        if (err) {
            console.error("Erro ao obter dispositivos:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json(rows);
    });
});

//rota louca
router.get('/dispositivos/:tombamento', (req, res) => {
    const { tombamento } = req.params;

    connect.query("SELECT * FROM dispositivos WHERE tombamento = ?", [tombamento], (err, result) => {
        if (err) {
            console.error("Erro ao obter o dispositivo pelo tombamento:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: "Dispositivo não encontrado" });
            return;
        }
        res.json(result); // Retorna os dispositivos encontrados com o tombamento especificado
    });
});



// ----------------------------------------------------------

// Rota para adicionar um novo dispositivo
router.post('/', (req, res) => {
    console.log(req.body);
    const { tombamento, descricao, idEstado, idUnidade, idTipo } = req.body;
    connect.query("INSERT INTO dispositivos (tombamento, descricao, idEstado, idUnidade, idTipo) VALUES (?, ?, ?, ?, ?)", [tombamento, descricao, idEstado, idUnidade, idTipo], (err, result) => {
        if (err) {
            console.error("Erro ao adicionar dispositivo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.status(201).json({ message: "Dispositivo adicionado com sucesso", id: result.insertId });
    });
});

// Rota para atualizar um dispositivo existente
router.put('/dispositivos/:tombamento', (req, res) => {
    const { tombamento } = req.params;
    const { descricao, idEstado, idUnidade, idTipo } = req.body;
    connect.query("UPDATE dispositivos SET descricao = ?, idEstado = ?, idUnidade = ?, idTipo = ?, WHERE tombamento = ?", [descricao, idEstado, idUnidade, idTipo, tombamento], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar o dispositivo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json({ message: "Dispositivo atualizado com sucesso" });
    });
});

// Rota para excluir um dispositivo
router.delete('/dispositivos/:tombamento', (req, res) => {
    const { tombamento } = req.params;
    connect.query("DELETE FROM dispositivos WHERE tombamento = ?", tombamento, (err, result) => {
        if (err) {
            console.error("Erro ao excluir o dispositivo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json({ message: "Dispositivo excluído com sucesso" });
    });
});

// // Rota para obter o status de um dispositivo específico
// router.get('/:idEstado/status', (req, res) => {
//     const { idEstado } = req.params;
//     connect.query("SELECT estado.estadoDispositivo FROM dispositivos INNER JOIN estado ON dispositivos.idEstado = estado.idEstado WHERE dispositivos.idEstado = ?", idEstado, (err, result) => {
//         if (err) {
//             console.error("Erro ao obter o status do dispositivo:", err);
//             res.status(500).json({ error: "Erro interno do servidor" });
//             return;
//         }
//         if (result.length === 0) {
//             res.status(404).json({ error: "Dispositivo não encontrado" });
//             return;
//         }
//         res.json({ status: result[0].estadoDispositivo });
//     });
// });

// // Rota para obter todos os dispositivos dentro de uma unidade específica
// router.get('/unidades/:idUnidade', (req, res) => {
//     const { idUnidade } = req.params;
//     connect.query("SELECT * FROM dispositivos WHERE idUnidade = ?", idUnidade, (err, result) => {
//         if (err) {
//             console.error("Erro ao obter os dispositivos da unidade:", err);
//             res.status(500).json({ error: "Erro interno do servidor" });
//             return;
//         }
//         res.json(result);
//     });
// });

// // Rota para obter todos os dispositivos operantes
// router.get('/operantes', (req, res) => {
//     connect.query("SELECT * FROM dispositivos WHERE idEstado = 1", (err, result) => {
//         if (err) {
//             console.error("Erro ao obter os dispositivos operantes:", err);
//             res.status(500).json({ error: "Erro interno do servidor" });
//             return;
//         }
//         res.json(result);
//     });
// });

// // Rota para obter todos os dispositivos em manutenção
// router.get('/manutencao', (req, res) => {
//     connect.query("SELECT * FROM dispositivos WHERE idEstado = 2", (err, result) => {
//         if (err) {
//             console.error("Erro ao obter os dispositivos em manutenção:", err);
//             res.status(500).json({ error: "Erro interno do servidor" });
//             return;
//         }
//         res.json(result);
//     });
// });

// // Rota para obter todos os dispositivos inoperantes
// router.get('/inoperantes', (req, res) => {
//     connect.query("SELECT * FROM dispositivos WHERE idEstado = 3", (err, result) => {
//         if (err) {
//             console.error("Erro ao obter os dispositivos inoperantes:", err);
//             res.status(500).json({ error: "Erro interno do servidor" });
//             return;
//         }
//         res.json(result);
//     });
// });

module.exports = router;
