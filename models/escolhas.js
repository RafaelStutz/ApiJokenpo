const conexao = require('../infra/conexao')


class Escolhas {
    adicionaEscolhas(escolhas, res) {
        const sql = `INSERT INTO Escolhas SET ?`

        conexao.query(sql, escolhas, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }
    listar(res) {
        const sql = 'SELECT * FROM Escolhas'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    listarEscolhas() {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT escolhas from Escolhas', (erro, resultado) => {
                if (erro) reject(erro)
                resolve(resultado.map(a => a.escolhas))
            })
        })
    }
}


module.exports = new Escolhas
