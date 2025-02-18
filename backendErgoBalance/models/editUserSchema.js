const Joi = require('joi')

const editUserSchema = Joi.object({
    program: Joi.array().items(
        Joi.object({
            pk: Joi.string().forbidden(),
            name: Joi.string().optional(),
            desc: Joi.string().optional(),
            exercises: Joi.array().items(
                Joi.object({
                    pk: Joi.string().forbidden(),
                    sk: Joi.string().required(),
                    name: Joi.string().optional(),
                    desc: Joi.string().optional(),
                    image: Joi.string().optional() 
                })
            ).optional()
        })
    ).optional()
})

module.exports = { editUserSchema }