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


// // Permite que o express receba JSON vindo do body da requisição
// app.use(express.json())

// let jogos = [
//     { id:1, nome:'rafael', vitorias:0 },
//     { id:2, nome:'maik',  vitorias:0 },
//     { id:3, nome:'henrique',  vitorias:0 },
//     { id:4, nome:'rayelly',  vitorias:0 }
// ]

// const jogadas = ['pedra', 'papel', 'tesoura']

// //escolha do computador
// function computador() {
//     const aleatorio = Math.floor(Math.random()*3)
//     const jogadaPC = jogadas[aleatorio]
//     return jogadaPC
// }

// //verificar se o jogador venceu
// function verificaSeVenceu(jogador, pc) {
//     if (jogador === 'pedra' && pc === 'tesoura' ||
//         jogador === 'papel' && pc === 'pedra' ||
//         jogador === 'tesoura' && pc === 'papel') {
//         return true;
//     } else {
//         return false;
//     }
// }

// //resultado da jogada
// function resultadoJogada(jogador, pc) {
//     if(jogador === 'pedra' && pc === 'tesoura' ||
//     jogador === 'papel' && pc === 'pedra' ||
//     jogador === 'tesoura' && pc === 'papel') {
//         return 'O jogador ganhou!'
//     } else if (jogador === pc) {
//         return 'Empate!'
//     } else {
//         return 'Computador ganhou!'
//     }
// }


// //ler os jogos
// app.get('/api/jokenpo', (req,res) => {
//     res.send(jogos)
// })

// //ranking
// app.get('/api/jokenpo/ranking', (req,res) => {
//     const ordenado = jogos.sort((a,b) => {
//         return b.vitorias - a.vitorias
//     })
//      let vitArray = ordenado.map(obj => obj.vitorias)
//      let nomeArray = ordenado.map(obj => obj.nome)
//      let nomeString = []
//      for(let i = 0; i < nomeArray.length; i++){
//          nomeString.push(i+1 + ". " + nomeArray[i] + " " + vitArray[i])
//      } 
//      res.send(nomeString)
// })

// //criar um jogo
// app.post('/api/jokenpo', (req,res) => {
//     const escolhaUsuario = req.body.escolha
//     const escolhaComputador = computador()
//     const resultado = resultadoJogada(escolhaUsuario, escolhaComputador)

//     const jogadorVenceu = verificaSeVenceu(escolhaUsuario, escolhaComputador)
//     let contador = 0
//     if(jogadorVenceu == true) {
//         contador = 1
//     }

//     //verificar se jogador já existe
//     const existeJogador = jogos.some(n => n.nome === req.body.nome)
//     if(existeJogador === true) {

//         jogos = jogos.map(jogo => {
//             if(jogo.nome === req.body.nome) {
//                 jogo.vitorias = jogo.vitorias + contador
//             }

//             return jogo
//         })
//     } else {
//         //adiciona se jogador ainda não existe na lista
//         const jogo = {
//             id: jogos.length + 1,
//             nome: req.body.nome,
//             vitorias: contador
//         }
//         jogos.push(jogo)

//     }
//     res.send(resultado)
// })

// app.delete('/api/jokenpo/:id', (req,res) => {
//     const jogo = jogos.find(j => j.id === parseInt(req.params.id))
//     if(!jogo) {
//         res.status(404).send('Jogo não encontrado.')
//     }
//     const index = jogos.indexOf(jogo)
//     jogos.splice(index, 1)
//     res.send('Usuário excluído!')
// })
