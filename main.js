const { SHA256 } = require("crypto-js")

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }
    calculateHash(data) {
        return SHA256(this.previousHash
            + this.timestamp + JSON.stringify(data) + this.nonce).toString()
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== "0".repeat(difficulty)) {
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log("Block mined: " + this.hash);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 2
        this.pendingTransactions = []
        this.miningReward = 100
    }
    createGenesisBlock() {
        return new Block('01/01/2022', 'Genesis_Block', "NONE")
    }
    getLatesBlock() {
        return this.chain[this.chain.length - 1]
    }
    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulty)
        console.log('Block succesfully mined');
        this.chain.push(block)

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }
    createTransaction(transactions) {
        this.pendingTransactions.push(transactions)
    }
    getBalanceOfAddress(address) {
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    console.log(trans.amount);
                    balance -= trans.amount
                }

                if(trans.toAddress === address){
                    console.log(trans.amount);
                    balance += trans.amount
                }
            }
        }
        return balance
    }
    isChainVAlid() {
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index];
            const previousBlock = this.chain[index - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false
            }
            return true
        }
    }
}

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