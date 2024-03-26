const express = require('express');
const connect = require('../db/connect'); // Importe a conexão do banco de dados

const router = express.Router();

// Rota para obter todos os dispositivos
router.get('/', (req, res) => {
    connect.query("SELECT * FROM dispositivos", (err, rows) => {
        if (err) {
            console.error("Erro ao obter dispositivos:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json(rows);
    });
});

// Rota para adicionar um novo dispositivo
router.post('/', (req, res) => {
    const { nome, status } = req.body;
    connect.query("INSERT INTO dispositivos (nome, status) VALUES (?, ?)", [nome, status], (err, result) => {
        if (err) {
            console.error("Erro ao adicionar dispositivo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.status(201).json({ message: "Dispositivo adicionado com sucesso", id: result.insertId });
    });
});

// Rota para atualizar um dispositivo existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, status } = req.body;
    connect.query("UPDATE dispositivos SET nome = ?, status = ? WHERE id = ?", [nome, status, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar o dispositivo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json({ message: "Dispositivo atualizado com sucesso" });
    });
});

// Rota para excluir um dispositivo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connect.query("DELETE FROM dispositivos WHERE id = ?", id, (err, result) => {
        if (err) {
            console.error("Erro ao excluir o dispositivo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json({ message: "Dispositivo excluído com sucesso" });
    });
});

// Rota para obter o status de um dispositivo específico
router.get('/dispositivos/:idEstado/status', (req, res) => {
    const { idEstado } = req.params;
    connect.query("SELECT estado.estadoDispositivo FROM dispositivos INNER JOIN estado ON dispositivos.idEstado = estado.idEstado WHERE dispositivos.idEstado = ?", idEstado, (err, result) => {
        if (err) {
            console.error("Erro ao obter o status do dispositivo:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: "Dispositivo não encontrado" });
            return;
        }
        res.json({ status: result[0].estadoDispositivo });
    });
});

// Rota para obter todos os dispositivos dentro de uma unidade específica
router.get('/unidades/:idUnidade/dispositivos', (req, res) => {
    const { idUnidade } = req.params;
    connect.query("SELECT * FROM dispositivos WHERE idUnidade = ?", idUnidade, (err, result) => {
        if (err) {
            console.error("Erro ao obter os dispositivos da unidade:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json(result);
    });
});

// Rota para obter todos os dispositivos operantes
router.get('/dispositivos/operantes', (req, res) => {
    connect.query("SELECT * FROM dispositivos WHERE idEstado = 1", (err, result) => {
        if (err) {
            console.error("Erro ao obter os dispositivos operantes:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json(result);
    });
});

// Rota para obter todos os dispositivos em manutenção
router.get('/dispositivos/manutencao', (req, res) => {
    connect.query("SELECT * FROM dispositivos WHERE idEstado = 2", (err, result) => {
        if (err) {
            console.error("Erro ao obter os dispositivos em manutenção:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json(result);
    });
});

// Rota para obter todos os dispositivos inoperantes
router.get('/dispositivos/inoperantes', (req, res) => {
    connect.query("SELECT * FROM dispositivos WHERE idEstado = 3", (err, result) => {
        if (err) {
            console.error("Erro ao obter os dispositivos inoperantes:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
            return;
        }
        res.json(result);
    });
});

module.exports = router;
