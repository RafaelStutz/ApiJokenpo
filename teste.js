
const Escolhas = require('./models/escolhas')
const Jogadores = require('./models/jogadores')





async function callbackdajogadorExiste() {
    const jogadas = await Jogadores.jogadorExiste('joão')
    return jogadas
}

callbackdajogadorExiste().then(existe => {
    return existe
})


async function ProcessarJogo() {
    const jogadas = await Escolhas.listarEscolhas()
    return jogadas
}

ProcessarJogo().then(jogadas => {
    return jogadas 
})


async function computador() {
    const jogadas = await ProcessarJogo()
    const aleatorio = Math.floor(Math.random() * jogadas.length)
    const jogadaPC = jogadas[aleatorio]
    return jogadaPC
}

computador().then(jogadaPC => {
    console.log(jogadaPC)
})





