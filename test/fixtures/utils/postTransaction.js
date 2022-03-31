const sinon = require('sinon')

module.exports = () => Object.freeze({
    postTransactionFake: sinon.fake(() => new Promise((resolve, reject) => {
        resolve()
    })),
    postTransactionRejectingFake: sinon.fake(() => new Promise((resolve, reject) => {
        reject()
    }))
})