const Web3 = require('web3')
const env = require('../env')
const web3 = new Web3(env.network)

module.exports = web3