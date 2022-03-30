const {BlockChain, Transaction} = require('./Blockchain')

const samuCoin = new BlockChain()
samuCoin.createTransaction(new Transaction('Alpha', 'Beta', 100))
samuCoin.createTransaction(new Transaction('Beta', 'Alpha', 20))

console.log("\nStarting mining");
samuCoin.minePendingTransactions('SamuWallet')

console.log("\nBalance of samu is ", samuCoin.getBalanceOfAddress('SamuWallet'));

console.log("\nStarting mining");
samuCoin.minePendingTransactions('SamuWallet')

console.log("\nBalance of samu is ", samuCoin.getBalanceOfAddress('SamuWallet'));

// console.log(JSON.stringify(samuCoin.chain, null, 2));