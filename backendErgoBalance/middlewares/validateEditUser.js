const { editUserSchema } = require('../models/editUserSchema')

const validateEditUser = () => ({
    before: (handler) => {
        const { error } = editUserSchema.validate(JSON.parse(handler.event.body))
        if(error) {
            throw new Error(error.details[0].message);
        }
        return
    }
})

module.exports = {validateEditUser}