const { editExercisesSchema } = require('../models/editExercisesSchema')

const validateEditExercises = () => ({
    before: (handler) => {
        const { error } = editExercisesSchema.validate(JSON.parse(handler.event.body))
        if(error) {
            throw new Error(error.details[0].message);
        }
        return
    }
})

module.exports = {validateEditExercises}