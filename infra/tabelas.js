class Tabelas{
    init(conexao) {
        this.conexao = conexao
        console.log("Tabelas foram chamadas.")
        this.Jogadores()
        this.Escolhas()
    }
    Jogadores() {
        const sql = `CREATE TABLE IF NOT EXISTS Jogadores (id int NOT NULL AUTO_INCREMENT, 
            nome varchar(30) NOT NULL, vitorias int, PRIMARY KEY (id))`
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log("Tabela Jogadores criada com sucesso.")
            }
        })
    }
    Escolhas() {
        const sql = `CREATE TABLE IF NOT EXISTS Escolhas (id int NOT NULL AUTO_INCREMENT, 
            escolhas varchar(20) NOT NULL, PRIMARY KEY (id))`
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log("Tabela Escolhas criada com sucesso.")
            }
        })
    }
    
}

module.exports = new Tabelas