const web3 = require('./web3')

module.exports = (key) => web3.eth.accounts.privateKeyToAccount(key)