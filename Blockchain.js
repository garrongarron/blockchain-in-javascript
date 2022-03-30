
const { Transaction } = require('./Transaction')
const {Block} = require('./Block')


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
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatesBlock().hash)
        block.mineBlock(this.difficulty)
        console.log('Block succesfully mined');
        this.chain.push(block)

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]
    }
    addTransaction(transaction) {
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to address')
        }

        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain')
        }
        this.pendingTransactions.push(transaction)
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
    isChainValid() {
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index];
            const previousBlock = this.chain[index - 1];

            if(!currentBlock.hasValidTransaction()){
                console.error(1);
                return false
            }
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.error(2);
                return false
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                console.error(3, `(${currentBlock.previousHash}) - (${previousBlock.hash})`);
                return false
            }
            return true
        }
    }
}


module.exports.BlockChain = BlockChain