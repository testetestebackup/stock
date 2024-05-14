const cors = require("cors");
const express = require("express");
const routes = require("./routes/routes"); // Importe o arquivo de rotas
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'web')));

// Roteamento para dispositivos
app.use('/dispositivos', routes); // Use as rotas definidas no arquivo de rotas

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    
})

// Rota para a página inicial 
app.get("/", (req, res) => {
    res.send("Bem-vindo ao sistema de catalogação de dispositivos!");
});

app.listen(3300, () => console.log("Servidor está rodando na porta 3300"));
