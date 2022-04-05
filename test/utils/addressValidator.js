const expect = require('chai').expect
const sinon = require('sinon')

const { makeAddressValidator, addressValidator } = require('../../utils/addressValidator')

describe('Validates address', async () => {
    it('returns false for invalid address', async () => {
        expect(await addressValidator('')).to.not.be.ok
    })

    it('returns true for a valid address', async () => {
        expect(await addressValidator('0x0089d53F703f7E0843953D48133f74cE247184c2')).to.be.ok  
    })
})