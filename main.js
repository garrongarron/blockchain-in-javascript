const EC = require('elliptic').ec
const ec = new EC('secp256k1')
const { BlockChain } = require('./Blockchain')
const keys = require('./keys')
const { Transaction } = require('./Transaction')

const samuCoin = new BlockChain()

const myKeys = ec.keyFromPrivate(keys.private)
const myWalletAddres = myKeys.getPublic('hex')

const tx1 = new Transaction(myWalletAddres, 'otraWallet' , 10)
tx1.singTransaction(myKeys)

samuCoin.addTransaction(tx1)


console.log("\nStarting mining");
samuCoin.minePendingTransactions(myWalletAddres)

console.log("\nCHAIN ", JSON.stringify(samuCoin.chain, null, 2));

console.log("\nBalance of samu is ", samuCoin.getBalanceOfAddress(myWalletAddres));

console.log("\nsamuCoin is valid ", samuCoin.isChainValid());



