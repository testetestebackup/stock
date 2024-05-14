const {createConnection} = require("mysql2")

const connect = createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db1"
})

connect.connect((err)=>{
    if (err) throw err
    console.log("conectou")
})

module.exports = connect