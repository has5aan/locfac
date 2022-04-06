const chai = require("chai")
chai.use(require("chai-as-promised"))
const expect = chai.expect
const sinon = require('sinon')
const { BlockChainError, ValidationError } = require('../../../lib/errors')

const makeRegister = require('../../../use-cases/locker/register')

const transactionReceipt = {}

const repository = {
    register: sinon.fake(() => new Promise((resolve, reject) => {
        resolve(transactionReceipt)
    }))
}

const repositoryFailing = {
    register: sinon.fake(() => new Promise((resolve, reject) => {
        reject('Error')
    }))
}

const validator = {
    validate: sinon.fake(() => new Promise((resolve, reject) => {
        resolve()
    }))
}

const validatorFailing = {
    validate: sinon.fake(() => new Promise((resolve, reject) => {
        reject(new ValidationError('message', {}))
    }))
}

describe('Register locker use-case', async () => {

    it('registers a locker', async () => {
        const register = makeRegister({ repository, validator })

        let args = { locker: 1, status: 1 }

        let actualTransactionReceipt = await register(args)

        expect(repository.register.calledOnceWith(args)).to.be.ok

        args = {
            data: { locker: 1, status: 1 },
            rulesToBeValidated: ['locker', 'status']
        }

        expect(validator.validate.calledOnceWith(args)).to.be.ok

        expect(actualTransactionReceipt).eql(transactionReceipt)
    })

    it('throws BlockChainError if repository throws an error', async () => {
        const register = makeRegister({ repository: repositoryFailing, validator })

        expect(register({ locker: 1, status: 1 })).to.be.rejectedWith(BlockChainError)
    })

    it('throws DomainError if repository throws an error', async () => {
        const register = makeRegister({ repository, validator: validatorFailing })

        expect(register({ locker: 1, status: 1 })).to.be.rejectedWith(ValidationError)
    })
})