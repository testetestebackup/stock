const express = require("express")
const connect = require("./db/connect")
const app = express()

app.get("/", (req, res)=>{
    connect.query("SELECT * FROM estado", (err, estado) => {
        console.log(rows)
        
        res.send(estado)
    })


})

app.listen(3300, ()=>console.log("está ok"))

