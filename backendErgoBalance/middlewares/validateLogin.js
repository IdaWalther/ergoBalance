const {loginSchema} = require('../models/loginSchema')

const validateLogin = () => ({
    before: (handler) => {
        const {error} = loginSchema.validate(JSON.parse(handler.event.body))
        if(error) {
            throw new Error(error.details[0].message)
        }
        return
    }
})

module.exports = {validateLogin}