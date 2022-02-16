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
            const vitorias = await Jogadores.buscaVitorias(nomeUsuario)
            console.log(vitorias, 'vitorias')
            if (jogador == null) {
                Jogadores.adicionaJogador(nomeUsuario)
            }
            const resultados = vitorias[0].vitorias + 1
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
        //verificar se o jogador venceu


        //resultado da jogada

        // const escolhajogador = jogador.escolha
        // const escolhaComputador = computador().then(jogadaPC => {
        //     return jogadaPC 
        // })
        // const resultado = resultadoJogada(escolhajogador, escolhaComputador)

        // const jogadorVenceu = verificaSeJogadorVenceu(escolhajogador, escolhaComputador)
        // let contador = 0
        // if (jogadorVenceu === true) {
        //     contador = 1
        // }

        // //verificar se jogador já existe
        // const nomedosjogadores = `SELECT nome FROM jokenpofinal`
        // const existeJogador = nomedosjogadores.some(n => n.nome === jogador.nome)
        // if (existeJogador === true) {

        //     Jogadores.atualizaVitorias(jogador.vitorias = jogador.vitorias + 1)
        // } else {
        //     //adiciona se jogador ainda não existe na lista
        //     Jogadores.adicionaJogador(jogador,res)
        //     // calcular opcao do computador XXXXXXXXX

        //     // comparar as jogadas xxxxxxxxxxx

        //     // verificar quem venceu xxxxxxxxx

        //     // adicionada jogada do jogador

        //     // adicionar vitoria ao jogdor

        // }
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