const sinon = require('sinon')

module.exports = () => {
    let estimateGasFake = sinon.fake(() => new Promise((resolve, reject) => {
        resolve(10)
    }))

    let encodeABIFake = sinon.fake(() => 'abi')

    let view = {
        hasLockerAccess: sinon.fake(() => (
            new Promise((resolve, reject) => {
                resolve(true)
            })
        )),
        lockerCollection: sinon.fake(() => (
            new Promise((resolve, reject) => {
                resolve({})
            })
        ))
    }

    let contract = {
        address: 'contract_address',
        methods: {
            register: sinon.fake(() => (
                {
                    estimateGas: estimateGasFake,
                    encodeABI: encodeABIFake
                }
            )),
            modifyStatus: sinon.fake(() => (
                {
                    estimateGas: estimateGasFake,
                    encodeABI: encodeABIFake
                }
            )),
            allotAccess: sinon.fake(() => (
                {
                    estimateGas: estimateGasFake,
                    encodeABI: encodeABIFake
                }
            )),
            revokeAccess: sinon.fake(() => (
                {
                    estimateGas: estimateGasFake,
                    encodeABI: encodeABIFake
                }
            )),
            hasLockerAccess: sinon.fake(() => (
                {
                    call: view.hasLockerAccess
                }
            )),
            lockerCollection: sinon.fake(() => (
                {
                    call: view.lockerCollection
                }
            ))
        }
    }

    return {
        contract,
        estimateGasFake,
        encodeABIFake,
        view
    }
}