const customExpress = require('./config/customexpress')
const conexao = require('./infra/conexao')
const Tabelas = require('./infra/tabelas')

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('Conectado com sucesso.')

        Tabelas.init(conexao)

        const app = customExpress()

        const port = process.env.PORT || 9091
        app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
    }
})