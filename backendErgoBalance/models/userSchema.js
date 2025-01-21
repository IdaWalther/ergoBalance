const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required()
})

module.exports = { userSchema }