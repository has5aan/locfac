const makeLockerRepository = require('./repositories/locker/locker')

const web3 = require('./utils/web3')
const contractDetails = require('./build/contracts/Locker.json')
const env = require('./env/index.json')
const accounts = require('./env/accounts.json')

const contract = new web3.eth.Contract(contractDetails.abi, contractDetails.networks[env.network_id].address)
contract.address = contract.options.address

const postTransaction = require('./utils/postTransaction')
const makeEthereumAccount = require('./utils/makeEthereumAccount')

const makeLockerRepositoryFor = (poster) => makeLockerRepository({ contract, postTransaction, poster })

const lockerRepository = makeLockerRepositoryFor(makeEthereumAccount(accounts[0].secretKey))

const lockerValidator = require('./domain/entities/rules/lockerValidator')

const makeRegisterUsecase = require('./use-cases/locker/register')

const registerUsecase = makeRegisterUsecase({ repository: lockerRepository, validator: lockerValidator })

registerUsecase({ locker: 1, status: 1 }).then(console.log).catch(console.log)
