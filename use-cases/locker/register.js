const { BlockChainError } = require('../../lib/errors')

module.exports = ({ repository, validator }) => async ({ locker, status }) => {
    await validator.validate({
        data: {
            locker,
            status
        }, rulesToBeValidated: ['locker', 'status']
    })

    try {
        await repository.register({ locker, status })
    }
    catch (err) {
        throw new BlockChainError(err.message)
    }
}