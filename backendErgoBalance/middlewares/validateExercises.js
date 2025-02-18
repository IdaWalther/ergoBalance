const { exercisesSchema } = require('../models/exercisesSchema')

const validateExercises = () => ({
    before: (handler) => {
        const { error } = exercisesSchema.validate(JSON.parse(handler.event.body))
        if(error) {
            throw new Error(error.details[0].message);
        }
        return
    }
})

module.exports = {validateExercises}