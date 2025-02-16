const Joi = require('joi')

const exercisesSchema = Joi.object({
    pk: Joi.string().required(),
    name: Joi.string().required(),
    desc: Joi.string().required(),
    image: Joi.string().required()
})

module.exports = { exercisesSchema }