const conexao = require('../infra/conexao')

class Jogadores {
    adicionaJogador(nome) {
        const sql = `INSERT INTO Jogadores SET nome = '${nome}', vitorias = 0`

        conexao.query(sql, nome)
    }
    jogadorExiste(req) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id FROM Jogadores WHERE nome = '${req}'`
            conexao.query(sql, (erro, resultado) => {
                if (erro) reject(erro)
                resolve(resultado)
            })
        })
    }
    atualizaVitorias(nome, vitorias) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Jogadores SET vitorias = '${vitorias}' WHERE nome = '${nome}'`
            conexao.query(sql, (erro, resultado) => {
                if (erro) reject(erro)
                resolve(resultado)
            })
        })
    }
    listar(res) {
        const sql = 'SELECT * FROM Jogadores'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Jogadores WHERE id='${id}'`

        conexao.query(sql, (erro, resultados) => {
            const jogador = resultados[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(jogador)
            }
        })
    }
    buscaVitorias(nome, res) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT vitorias FROM Jogadores WHERE nome= '${nome}'`
            conexao.query(sql, (erro, resultado) => {
                if (erro) reject(erro)
                resolve(resultado)
            })
        })
    }

}


module.exports = new Jogadores
