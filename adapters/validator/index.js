const Joi = require('joi')
const { ValidationError } = require('../../lib/errors')

function Validator({ schema = {}, rules, options = { validateSchema: false } }) {
    this.validate = async function ({ data, rulesToBeValidated } = { rulesToBeValidated: [] }) {
        let consolidatedRules = {}

        rulesToBeValidated.forEach((rule) => {
            consolidatedRules[rule] = rules[rule]
        })

        let schemaValidation = Joi.object(schema)
        let rulesValidation = Joi.object(consolidatedRules)

        try {
            if (options.validateSchema)
                await schemaValidation.validateAsync(data, {
                    abortEarly: false
                })

            await rulesValidation.validateAsync(data, {
                abortEarly: false,
                allowUnknown: true
            })

            return data
        }
        catch (err) {
            throw new ValidationError(err.message, err.details)
        }
    }
}

module.exports = Validator