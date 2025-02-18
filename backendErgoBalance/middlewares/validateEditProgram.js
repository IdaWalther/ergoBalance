const { editProgramSchema } = require('../models/editProgramSchema')

const validateEditProgram = () => ({
    before: (handler) => {
        const { error } = editProgramSchema.validate(JSON.parse(handler.event.body))
        if(error) {
            throw new Error(error.details[0].message);
        }
        return
    }
})

module.exports = {validateEditProgram}