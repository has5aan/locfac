const accounts = require('./env/accounts.json')

const makeEthereumAccount = require('./utils/makeEthereumAccount')

const makeLockerRepositoryFor = require('./repositories/locker/lockerForPoster')

const lockerRepository = makeLockerRepositoryFor(makeEthereumAccount(accounts[0].secretKey))

const lockerValidator = require('./domain/entities/rules/lockerValidator')

const makeRegisterUsecase = require('./use-cases/locker/register')

const registerUsecase = makeRegisterUsecase({ repository: lockerRepository, validator: lockerValidator })

registerUsecase({ locker: 1, status: 1 }).then(console.log).catch(console.log)
