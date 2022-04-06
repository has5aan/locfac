const expect = require('chai').expect
const makeLocker = require('../../repositories/locker/locker')

const makeFakeContract = require('../fixtures/contracts/locker')
const postTransactionFixture = require('../fixtures/utils/postTransaction')

function verifyTransactionPosting(contract, estimateGasFake, encodeABIFake, postTransactionFake, poster) {
    expect(estimateGasFake.calledOnceWith({ from: poster.address })).to.be.ok

    expect(encodeABIFake.calledOnce).to.be.ok

    expect(postTransactionFake.calledOnceWith({
        transaction: {
            from: poster.address,
            to: contract.address,
            data: 'abi',
            gas: 10,
        }, poster
    })).to.be.ok
}

describe('Locker Repository', async () => {
    let contract, estimateGasFake, encodeABIFake, postTransaction, transactionReceipt, locker
    const poster = { address: 'poster_address' }

    beforeEach(() => {
        ({ contract, estimateGasFake, encodeABIFake, view } = makeFakeContract())

        let postTransactionFixtureResponse = postTransactionFixture()
        
        postTransaction = postTransactionFixtureResponse.postTransactionFake
        transactionReceipt = postTransactionFixtureResponse.transactionReceipt

        locker = makeLocker({ contract, postTransaction, poster })
    })

    it('registers a locker ', async () => {
        let args = { locker: 1, status: 1 }

        let actualTransactionReceipt = await locker.register(args)

        expect(contract.methods.register.calledOnceWith(args.locker, args.status))
            .to.be.ok

        verifyTransactionPosting(contract, estimateGasFake, encodeABIFake, postTransaction, poster)

        expect(actualTransactionReceipt).to.eql(transactionReceipt)
    })

    it('modifies status of a locker', async () => {
        let args = { locker: 1, status: 1 }

        await locker.modifyStatus(args)

        expect(contract.methods.modifyStatus.calledOnceWith(args.locker, args.status))
            .to.be.ok

        verifyTransactionPosting(contract, estimateGasFake, encodeABIFake, postTransaction, poster)
    })

    it('allots access to a locker', async () => {
        let args = { locker: 1, user: 'address' }

        await locker.allotAccess(args)

        expect(contract.methods.allotAccess.calledOnceWith(args.locker, args.user))
            .to.be.ok

        verifyTransactionPosting(contract, estimateGasFake, encodeABIFake, postTransaction, poster)
    })

    it('revokes access to a locker', async () => {
        let args = { locker: 1, user: 'address' }

        await locker.revokeAccess(args)

        expect(contract.methods.revokeAccess.calledOnceWith(args.locker, args.user))
            .to.be.ok

        verifyTransactionPosting(contract, estimateGasFake, encodeABIFake, postTransaction, poster)
    })

    it('verifies access to a locker', async () => {
        let args = { locker: 1, user: 'address' }

        let status = await locker.hasLockerAccess(args)

        expect(contract.methods.hasLockerAccess.calledOnceWith(args.locker, args.user))
            .to.be.ok

        expect(view.hasLockerAccess.calledOnce).to.be.ok

        expect(status).to.equal(await contract.methods.hasLockerAccess().call())
    })

    it('returns details about the locker', async () => {
        let args = { identifier: 1 }

        let status = await locker.lockerDetails(args)

        expect(contract.methods.lockerCollection.calledOnceWith(args.identifier))
            .to.be.ok

        expect(view.lockerCollection.calledOnce).to.be.ok

    })
})