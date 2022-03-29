const MockProvider = require('ethereum-waffle').MockProvider
const solidity = require('ethereum-waffle').solidity
const deployContract = require('ethereum-waffle').deployContract

const LockerContract = require('../../build/contracts/Locker.json')

const chai = require('chai')
chai.use(solidity)
const expect = chai.expect
const provider = new MockProvider()
const wallets = provider.getWallets()

const errors = {
    UniqueLocker: 'Locker already registered!',
    NonZeroStatus: 'Status can not be set to zero!',
    NonExistingLocker: 'Locker not registered!',
    InvalidOwner: 'Invalid owner!'
}

describe('Locker Contract', () => {
    let minter = wallets[0]
    let locker;

    beforeEach(async () => {
        locker = await deployContract(minter, LockerContract)
    })

    it('sets the minter', async () => {
        let actualMinter = await locker.minter()

        expect(actualMinter).to.equal(minter.address)
    })

    describe('locker registration with a specified number and status', async () => {
        it('lets poster register a locker', async () => {
            locker = locker.connect(wallets[1])
            
            await locker.register(1, 1)
        })

        it('does not allow locker to be registered with status set to 0', async () => {
            await expect(locker.register(1, 0))
                .to.be.revertedWith(errors.NonZeroStatus)
        })

        it('locker number must be unique', async () => {
            await locker.register(1, 1)

            await expect(locker.register(1, 1))
                .to.be.revertedWith(errors.UniqueLocker)
        })

        it('emits LockerManipulated', async () => {
            await expect(locker.register(1, 1))
                .to.emit(locker, 'LockerManipulated')
                .withArgs(minter.address, 1, 1)
        })
    })

    describe('locker status modification after registration', async () => {

        beforeEach(async () => {
            await locker.register(1, 1)
        })

        it('lets owner modifies the status of a locker', async () => {
            await locker.modifyStatus(1, 2)
        })

        it('emits LockerManiuplated', async () => {
            await expect(locker.modifyStatus(1, 2))
                .to.emit(locker, 'LockerManipulated')
                .withArgs(minter.address, 1, 2)
        })

        it('throws error if locker is not already registered', async () => {
            await expect(locker.modifyStatus(2, 1))
                .to.be.revertedWith(errors.NonExistingLocker)
        })

        it('only allows owner to modify the status of the locker', async () => {
            locker = locker.connect(wallets[1])

            await expect(locker.modifyStatus(1, 2))
                .to.be.revertedWith(errors.InvalidOwner)
        })
    })
    
    describe('LockerData is maintained against it\'s identifier', async () => {
        let data

        beforeEach(async () => {
            await locker.register(1, 1)

            data = await locker.lockerCollection(1)
        })

        it('contains identifier', async () => {
            expect(data).to.have.property('identifier')
        })

        it('contains owner', async () => {
            expect(data).to.have.property('owner')
        })

        it('contains status', async () => {
            expect(data).to.have.property('status')
        })
    })

    describe('access control to locker', async () => {
        let allotedTo;

        beforeEach(async () => {
            await locker.register(1, 1)

            allotedTo = wallets[1]
        })

        describe('allotment of access to locker', async () => {
            it('allots user access to locker', async () => {
                await locker.allotAccess(1, allotedTo.address)
            })
    
            it('allotment of access emits LockerAccessManipulated', async () => {
                await expect(locker.allotAccess(1, allotedTo.address))
                    .to.emit(locker, 'LockerAccessManipulated')
                    .withArgs(wallets[0].address, allotedTo.address, 1, true)
            })

            it('throws error if locker is not already registered', async () => {
                await expect(locker.allotAccess(2, allotedTo.address))
                    .to.be.revertedWith(errors.NonExistingLocker)
            })

            it('only allows owner to allot access to locker', async () => {
                locker = locker.connect(wallets[2])

                await expect(locker.allotAccess(1, allotedTo.address))
                    .to.be.revertedWith(errors.InvalidOwner)
            })
        })

        describe('revokement of access to locker', async () => {
            it('revokes user\'s access to locker', async () => {
                await locker.revokeAccess(1, allotedTo.address)
            })
    
            it('revokement of access emits LockerAccessManipulated', async () => {
                await expect(locker.revokeAccess(1, allotedTo.address))
                    .to.emit(locker, 'LockerAccessManipulated')
                    .withArgs(wallets[0].address, allotedTo.address, 1, false)
            })

            it('throws error if locker is not already registered', async () => {
                await expect(locker.revokeAccess(2, allotedTo.address))
                    .to.be.revertedWith(errors.NonExistingLocker)
            })

            it('only allows owner to revoke access to locker', async () => {
                locker = locker.connect(wallets[2])

                await expect(locker.revokeAccess(1, allotedTo.address))
                    .to.be.revertedWith(errors.InvalidOwner)
            })
        })

        describe('querying access control to locker', async () => {
            it('owner has access to locker', async () => {
                let hasAccess = await locker.hasLockerAccess(1, wallets[0].address)
                
                expect(hasAccess).to.be.true
            })

            it('access to locker can be queried', async () => {
                await locker.allotAccess(1, allotedTo.address)
                
                let hasAccess = await locker.hasLockerAccess(1, allotedTo.address)

                expect(hasAccess).to.be.true

                await locker.revokeAccess(1, allotedTo.address)

                hasAccess = await locker.hasLockerAccess(1, allotedTo.address)

                expect(hasAccess).to.be.false
            })
        })
    })
})