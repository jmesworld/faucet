// require('dotenv').config()
const Server = require("../src/lib/Server/Server");

function startFaucet() {
  console.log(process.env.LCD_URL);
  console.log(process.env.CHAIN_ID);
  console.log(process.env.FAUCET_MNEMONIC);
  const server = new Server();
  server.init().then(() => server.start());
}

startFaucet();
