const { programSchema } = require('../models/programSchema')

const validateProgram = () => ({
    before: (handler) => {
        const { error } = programSchema.validate(JSON.parse(handler.event.body))
        if(error) {
            throw new Error(error.details[0].message);
        }
        return
    }
})

module.exports = {validateProgram}