const chai = require("chai")
chai.use(require("chai-as-promised"))
const expect = chai.expect

const validator = require('../../../../domain/entities/rules/lockerValidator')
const { ValidationError } = require("../../../../lib/errors")

describe('Locker Validator', async () => {
    describe('rules:', async () => {
        describe('locker:', async () => {
            expect(validator.validate({
                data: {
                    locker: 1
                }, rulesToBeValidated: ['locker']
            })).to.be.fulfilled

            it('is a required integer', async () => {
                expect(validator.validate({
                    data: {

                    }, rulesToBeValidated: ['locker']
                })).to.be.rejectedWith(ValidationError)
            })
        })

        describe('status:', async () => {
            it('is a required integer', async () => {
                expect(validator.validate({
                    data: {
                        status: 1
                    }, rulesToBeValidated: ['status']
                })).to.be.fulfilled

                expect(validator.validate({
                    data: {

                    }, rulesToBeValidated: ['status']
                })).to.be.rejectedWith(ValidationError)
            })

            it('is minimum 1', async () => {
                expect(validator.validate({
                    data: {
                        status: 1
                    }, rulesToBeValidated: ['status']
                })).to.be.fulfilled

                expect(validator.validate({
                    data: {
                        status: 0
                    }, rulesToBeValidated: ['status']
                })).to.be.rejectedWith(ValidationError)
            })
        })

        describe('address:', async () => {
            it('is a required valid address', async () => {
                expect(validator.validate({
                    data: {
                        address: '0x0089d53F703f7E0843953D48133f74cE247184c2'
                    }, rulesToBeValidated: ['address']
                })).to.be.fulfilled

                expect(validator.validate({
                    data: {
                        
                    }, rulesToBeValidated: ['address']
                })).to.be.rejectedWith(ValidationError)

                expect(validator.validate({
                    data: {
                        address: '0x0089d53F703f7E0843953D48133f74cE24'
                    }, rulesToBeValidated: ['address']
                })).to.be.rejectedWith(ValidationError)
            })
        })
    })
})