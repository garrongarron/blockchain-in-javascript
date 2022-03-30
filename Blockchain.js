
const { Transaction } = require('./Transaction')
const {Block} = require('./Blok')


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
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    console.log(trans.amount);
                    balance -= trans.amount
                }

                if (trans.toAddress === address) {
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


module.exports.BlockChain = BlockChain