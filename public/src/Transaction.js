import SHA256 from "../js/SHA256.js"
const ec = elliptic.ec('secp256k1')

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
        this.signature = null
    }

    calculateHash() {
        return SHA256(this.fromAddress, this.toAddress, this.amount)
        // return SHA256(this.fromAddress, this.toAddress, this.amount).toString()
    }

    singTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You can not sing transactions for other wallets')
        }
        const hashTx = this.calculateHash()
        const sig = signingKey.sign(hashTx, 'base64')
        this.signature = sig.toDER('hex')
    }

    isValid() {
        if (this.fromAddress === null) return true
        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction')
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')
        return publicKey.verify(this.calculateHash(), this.signature)
    }
}

export default Transaction