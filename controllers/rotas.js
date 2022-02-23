const Jogadores = require('../models/jogadores')
const Escolhas = require('../models/escolhas')
const { adicionaJogador, atualizaVitorias } = require('../models/jogadores')


module.exports = app => {

    //escolhas
    app.get('/escolhas', (req, res) => {
        Escolhas.listar(res)
    })

    app.post('/escolhas', (req, res) => {
        const escolhas = req.body

        Escolhas.adicionaEscolhas(escolhas, res)
    })

    //jogadores
    app.get('/jogadores', (req, res) => {
        Jogadores.listar(res)
    })

    app.get('/jogadores/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Jogadores.buscaPorId(id, res)
    })

    //jogar 
    app.post('/jogar', async (req, res) => {

        const escolhaUsuario = req.body.escolha
        const nomeUsuario = req.body.nome

        //escolha do computador
        const escolhaComputador = await computador();


        //verificar se o jogador
        const jogadorVenceu = verificaSeJogadorVenceu(escolhaUsuario, escolhaComputador)
        console.log('Validação do resultado', jogadorVenceu)

        //adicionar vitoria do jogador
        //Jogadores.adicionaJogador(nomeUsuario)
            

        if (jogadorVenceu) {

            const jogador = await Jogadores.jogadorExiste(nomeUsuario)
            console.log(jogador)
            if (jogador == false) {
                await Jogadores.adicionaJogador(nomeUsuario)
            }
            const vitorias = await Jogadores.buscaVitorias(nomeUsuario)
            console.log(vitorias, 'vitorias')
            const resultados = vitorias[0].vitorias + 1
            console.log(resultados)
            await Jogadores.atualizaVitorias(nomeUsuario, resultados)

        } else {
            const jogador = await Jogadores.jogadorExiste(nomeUsuario)

            if (jogador == null) {
                Jogadores.adicionaJogador(nomeUsuario)
            }
        }


        //verifica jogada        
        const mensagemJogada = resultadoJogada(escolhaUsuario, escolhaComputador)

        res.send(mensagemJogada)
        
    })

    //ranking
    app.get('/ranking', async (req,res) => {
        const ranking = await Jogadores.ranking()
        res.send(ranking)
        console.log(ranking)
    })

    //deletar jogador
    app.delete('/jogador/:id', (req,res) => {
        const id = parseInt(req.params.id)

        Jogadores.deleta(id, res)
    })

    async function ProcessarJogo() {
        const jogadas = await Escolhas.listarEscolhas()
        return jogadas
    }

    async function computador() {
        const jogadas = await ProcessarJogo()
        const aleatorio = Math.floor(Math.random() * jogadas.length)
        const jogadaPC = jogadas[aleatorio]
        return jogadaPC
    }

    function resultadoJogada(jogador, pc) {
        if (jogador === 'pedra' && pc === 'tesoura' ||
            jogador === 'papel' && pc === 'pedra' ||
            jogador === 'tesoura' && pc === 'papel') {
            return 'O jogador ganhou!'
        } else if (jogador === pc) {
            return 'Empate!'
        } else {
            return 'Computador ganhou!'
        }
    }

    function verificaSeJogadorVenceu(jogador, pc) {
        if (jogador === 'pedra' && pc === 'tesoura' ||
            jogador === 'papel' && pc === 'pedra' ||
            jogador === 'tesoura' && pc === 'papel') {
            return true;
        } else {
            return false;
        }
    }
}