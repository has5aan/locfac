const makeAddressValidator = (web3) => (address) => {
    return web3.utils.isHexStrict(address) && web3.utils.isAddress(address)
}

const addressValidator = makeAddressValidator(require('./web3'))

module.exports = {
    makeAddressValidator,
    addressValidator
}