
const connect = require('express');
const path = require('path');
const FaucetManager = require('../../FaucetManager/FaucetManager');
const routes = require('../../../routes');

const FAUCET_PRIVATE_KEY = '3043fe3011a50ea3e6015a2e650f83d13eb90bf65f2e5213a10c81f3c53e1a9e'
const VALIDATOR_PRIVATE_KEY = '21880b2e60c0440155bc3ecb7952610b00f15b53517379b7b0e546cf9d43d49b';
async function init () {
    console.info('Initializing Server');

    if (this.instance !== null) throw new Error('Instance is already initialized.');
    try {
        const hostname = process.env.HOSTNAME ?? '164.92.191.45';
        const hostport = process.env.HOSTPORT ?? '1317';

        const url = `http://${hostname}:${hostport}`;
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
