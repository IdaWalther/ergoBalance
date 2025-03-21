const {exercisesSchema} = require('./exercisesSchema')

const editExercisesSchema = exercisesSchema.fork(
    ['pk', 'name', 'desc', 'image'],
    field => field.optional()
)

module.exports = { editExercisesSchema }