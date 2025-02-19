const Joi = require('joi')

const editProgramSchema = Joi.object({
    addExercises: Joi.array().items(
        Joi.object({
            pk: Joi.string().required(),
            sk: Joi.string().required(),
            name: Joi.string().required(),
            desc: Joi.string().required(),
            image: Joi.string().required()
        })
    ).optional(),
    removeExercises: Joi.array().items(
        Joi.string().optional()
    ).optional()
})

module.exports = { editProgramSchema }