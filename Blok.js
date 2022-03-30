const { SHA256 } = require("crypto-js")

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

module.exports.Block = Block