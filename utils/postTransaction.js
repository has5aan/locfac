const web3 = require('./web3');

module.exports = async ({ transaction, poster }) => {
    let nonce = await web3.eth.getTransactionCount(poster.address)
  
    transaction.nonce = nonce

    let signedTransaction = await poster.signTransaction(transaction)

    let receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)

    return receipt
}