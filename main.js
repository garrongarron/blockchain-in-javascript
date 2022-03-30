const { SHA256 } = require("crypto-js")


class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }
    calculateHash(data) {
        return SHA256(this.index + this.previousHash
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
        this.difficulty = 4
    }
    createGenesisBlock() {
        return new Block(0, '01/01/2022', 'Genesisblock', "NONE")
    }
    getLatesBlock() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatesBlock().hash
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
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

console.log('Mining block 1...');
samuCoin.addBlock(new Block(1, '05/05/2022', { amount: 10 }))

console.log('Mining block 2...');
samuCoin.addBlock(new Block(2, '15/05/2022', { amount: 9 }))
