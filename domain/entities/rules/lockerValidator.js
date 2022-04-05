const Joi = require('joi')
const Validator = require('../../../adapters/validator')

module.exports = new Validator({
    rules: {
        'locker': Joi.number().integer().required(),
        'status': Joi.number().integer().min(1).required()
    }
})

module.exports.validate({
    data: {
        status: 1,
    }, rulesToBeValidated: ['status']
}).catch(console.error)