import hash from "../js/SHA256.js"

const MINE_RATE = 3000
let previousTimestampVar = null

class Block {
    constructor(timestamp, transactions, previousHash = 'nope', previousTimestamp = '') {
        this.timestamp = timestamp
        previousTimestampVar = previousTimestamp
        this.transactions = transactions
        this.previousHash = previousHash;
        this.hash = this.calculateHash()
        this.nonce = 0
    }
    
    calculateHash(data) {
        return hash(this.previousHash
            + this.timestamp + JSON.stringify(data) + this.nonce)
    }

    mineBlock(difficulty) {
        let newDifficuty = difficulty
        let time
        while (this.hash.substring(0, difficulty) !== "0".repeat(difficulty)) {
            time = Date.now()
            newDifficuty = previousTimestampVar + MINE_RATE > time ? difficulty + 1 : difficulty - 1
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log("Block mined: " + this.hash);
        return newDifficuty
    }
    hasValidTransaction() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) return false
        }
        return true
    }
}


export default Block