
const connect = require('express');
const path = require('path');
const FaucetManager = require('../../FaucetManager/FaucetManager');
const routes = require('../../../routes');
require('dotenv').config()

async function init () {
    console.info('Initializing Server');

    if (this.instance !== null) throw new Error('Instance is already initialized.');
    try {
        const hostname = process.env.HOSTNAME ?? '164.92.191.45';
        const hostport = process.env.HOSTPORT ?? '1317';

        const url = `http://${hostname}:${hostport}`;
        console.log("request url: ", url)
        this.faucetManager = new FaucetManager({
            lcdc: {
                URL: url
            },
            mnemonic: process.env.FAUCET_MNEMONIC
        });
        await this.faucetManager.init({
            password: '',
        });

        console.log('Faucet ready');
        // const sendTransactionRequest = await this.faucetManager.sendTransaction({
        //     address: "0x060Cf7c0972217F37dB63Ab44B9EdE9A41e0DEB4",
        //     amount: 8888
        // })
        // console.log({sendTransactionRequest});

    }catch (e){
        console.error('e');
    }

    const instance = connect();


    routes.register({
        server: instance,
        managers: {
            faucetManager: this.faucetManager,
        }
    });

    this.instance = instance;
    return this;
}

module.exports = init
