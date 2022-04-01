import SHA256 from "../js/SHA256.js"
import BlockChain from "./Blockchain.js"
import keys from "./keys.js"
import Transaction from "./Transaction.js"

const ec = elliptic.ec('secp256k1')

const samuCoin = new BlockChain()

const myKeys = ec.keyFromPrivate(keys.private)
const myWalletAddres = myKeys.getPublic('hex')

const tx1 = new Transaction(myWalletAddres, 'otraWallet' , 10)
tx1.singTransaction(myKeys)

samuCoin.addTransaction(tx1)


console.log("\nStarting mining");
for (let index = 0; index < 10; index++) {
    samuCoin.minePendingTransactions(myWalletAddres)
    console.log(index);
}

console.log("\nCHAIN ", JSON.stringify(samuCoin.chain, null, 2));

console.log("\nBalance of samu is ", samuCoin.getBalanceOfAddress(myWalletAddres));

console.log("\nsamuCoin is valid ", samuCoin.isChainValid());
