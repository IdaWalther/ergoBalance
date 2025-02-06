const Joi = require('joi');

const loginSchema = Joi.object({
    usernameOrEmail: Joi.string().required().messages({
        'string.empty': 'Användarnamnet får inte vara tomt',
        'any.required': 'Du måste ange användarnamn eller email'
    }),
    password: Joi.string().min(5).required().messages({
        'string.empty': 'Lösenordet får inte vara tomt',
        'any.required': 'Lösenordet måste anges med minst 5 tecken'
    }),
});

module.exports = { loginSchema };