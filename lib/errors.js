function DomainError(message) {
    Error.call(this, message)
    this.message = message
}

DomainError.prototype = Object.create(Error.prototype)
DomainError.prototype.constructor = Error

function ValidationError(message, details) {
    DomainError.call(this, message)
    this.details = details
}

ValidationError.prototype = Object.create(DomainError.prototype)
ValidationError.prototype.constructor = ValidationError

function IOError(message) {
    Error.call(this, message)
    this.message = message
}

IOError.prototype = Object.create(Error.prototype)
IOError.prototype.constructor = IOError

function BlockChainError(message) {
    IOError.call(this, message)
    this.message = message
}

BlockChainError.prototype = Object.create(IOError.prototype)
BlockChainError.prototype.constructor = BlockChainError

module.exports = {
    DomainError,
    ValidationError,
    IOError,
    BlockChainError
}