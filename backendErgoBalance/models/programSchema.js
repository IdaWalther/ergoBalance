const Joi = require('joi')

const programSchema = Joi.object({
    pk: Joi.string().required(),
    name: Joi.string().required(),
    desc: Joi.string().required(),
    exercises: Joi.array().items(
        Joi.object({
            pk: Joi.string().required(),
            name: Joi.string().required(),
            desc: Joi.string().required(),
            image: Joi.string().required()
        })
    )
})

module.exports = { programSchema }