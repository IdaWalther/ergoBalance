const { userSchema } = require('../models/userSchema')

const validateNewUser = () => ({
    before: (handler) => {
        const { error } = userSchema.validate(JSON.parse(handler.event.body))
        if(error) {
            throw new Error(error.details[0].message);
        }
        return
    }
})

module.exports = {validateNewUser}