const makeLockerRepository = require('../../repositories/locker/locker')

const web3 = require('../../utils/web3')
const contractDetails = require('../../build/contracts/Locker.json')
const env = require('../../env/index.json')

const postTransaction = require('../../utils/postTransaction')

const contract = new web3.eth.Contract(contractDetails.abi, contractDetails.networks[env.network_id].address)
contract.address = contract.options.address

module.exports = (poster) => makeLockerRepository({ contract, postTransaction, poster })
