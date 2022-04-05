const Joi = require('joi')
const Validator = require('../../../adapters/validator')
const  { addressValidator } = require('../../../utils/addressValidator')

module.exports = new Validator({
    rules: {
        'locker': Joi.number().integer().required(),
        'status': Joi.number().integer().min(1).required(),
        'address': Joi.string().required().custom((value, helpers) => {
            let valid = addressValidator(value)

            if (valid)
                return value

            return helpers.error('any.invalid')
        })
    }
})