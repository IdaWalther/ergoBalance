const Joi = require('joi')

const editProgramSchema = Joi.object({
    name: Joi.string().optional(),
    desc: Joi.string().optional(),
    exercises: Joi.array().items(
        Joi.object({
            sk: Joi.string().optional(),
            name: Joi.string().optional(),
            desc: Joi.string().optional(),
            image: Joi.string().optional()
        })
    )
})

module.exports = { editProgramSchema }