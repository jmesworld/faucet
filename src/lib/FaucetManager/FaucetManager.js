const jmes = require('jmes');
const wait = async (ts)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(true)
        }, ts)
    })
}
class FaucetManager {
    constructor(props = {}) {
        this.account = null;
        this.mnemonic = (props.mnemonic) ? props.mnemonic : null;
        this.privateKey = (props.privateKey) ? props.privateKey : null;

        const client = new jmes.Client();
        const wallet = client.createWallet(new jmes.Mnemonic(this.mnemonic))
        const account = wallet.getAccount();
        this.account = account;

        this.lcdcURL = props?.lcdc?.URL ?? 'http://164.92.191.45:1317';
        try {
            this.lcdc = client.createLCDClient({
                URL: this.lcdcURL
            });
        } catch (e){
            console.error('Failed to perform creating the LCDCClient');
            console.error(e);
        }

        console.log("Faucet address:",account.getAddress());
        if(this.mnemonic === null){
            throw new Error('Expected a mnemonic');
        }
    }

    async init(props = {}){
        await wait(10000);
        const balance = await this.getBalance()
        console.log(`Initializing... Current balance: ${balance}`)

        // const host = 'http://3.72.109.56:8545';
        // console.log(`Connecting to faucet: ${host}`);
        // const web3 = new Web3(
            // new Web3.providers.HttpProvider('http://jmes_node:8545')
            // new Web3.providers.HttpProvider(host)
        // );

        // const password = (props.password)? props.password : "";


        // console.log('Mnemonic:',this.mnemonic)
        // const seed =  await mnemonicToSeed(this.mnemonic, password) ;
        //
        // const privateKey = this.privateKey || seed;
        // this.account = web3.eth.accounts.privateKeyToAccount(privateKey, true);
        // console.log(this.account)
        // console.log('Faucet Address:', this.account.address)
        // this.web3 = web3;
        // const balance = await this.getBalance(this.account.address)
        // console.log(`Balance: ${Web3.utils.fromWei(balance.toString())} JMES (${balance})`)
    }

    getAddress(){
        return this.account.getAddress()
    }
    async getBalance(address){
        try {
            const [balance] = await this.lcdc.bank.balance(address ?? this.account.getAddress());
            return balance.get('ujmes') || new jmes.Core.Coin("ujmes", 0)
        } catch (e){
            console.log(e);
        }
        // const balance = await this.web3.eth.getBalance(address);
        // console.log(`web3/request_getBalance(${address})`)
        // return balance;
    }
    generateMnemonic(){
        // const generateMnemonic = async () => {
        //     const randomBytes = crypto.getRandomValues(new Uint8Array(32));
        //     console.log(randomBytes);
        //     const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
        //     console.log(mnemonic);
        //     return mnemonic;
        // };
    }
    async sendTransaction(transactionParams = {}){
        const {address, amount} = transactionParams
        if(!address) throw new Error('Missing address');
        if(!amount) throw new Error('Missing amount');
        const balance = await this.getBalance(this.account.address)
        const recipientBalance = await this.getBalance(address);
        if(balance<amount){
            throw new Error(`Unsufficiant amount ${balance}<${amount}`)
        }

        console.log(`Sending ${amount} to ${address} (self balance: ${balance} - target balance: ${recipientBalance})`)

        const tx = await this.account.sendTransaction({
            recipientAddress: address,
            recipientAmount: amount
        },this.lcdcURL, 'jmes-testnet-1')
        return { transactionHash: tx.txhash}
    }
};
module.exports = FaucetManager;
