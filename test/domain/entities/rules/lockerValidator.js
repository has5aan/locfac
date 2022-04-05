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
    })
})