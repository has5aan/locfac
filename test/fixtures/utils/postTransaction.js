const sinon = require('sinon')

const transactionReceipt = {}

module.exports = () => Object.freeze({
    postTransactionFake: sinon.fake(() => new Promise((resolve, reject) => {
        resolve(transactionReceipt)
    })),
    postTransactionRejectingFake: sinon.fake(() => new Promise((resolve, reject) => {
        reject()
    })),
    transactionReceipt
})