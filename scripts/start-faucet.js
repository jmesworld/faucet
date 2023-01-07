// require('dotenv').config()
const Server = require('../src/lib/Server/Server')

function startFaucet () {
    const server = new Server()
    server
        .init()
        .then(() => server.start())
}

startFaucet()
