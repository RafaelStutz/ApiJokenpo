const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Mpma!69666',
    database: 'jokenpofinal'
})

module.exports = conexao
