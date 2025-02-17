const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
    program: Joi.array().items(
        Joi.object({
            pk: Joi.string().required(),
            name: Joi.string().required(),
            desc: Joi.string().required(),
            image: Joi.string().required() 
        })
    )
})

module.exports = { userSchema }