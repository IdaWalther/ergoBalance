const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const { validateKey } = require('../../middlewares/validateKey.js');
const { validateEditProgram } = require('../../middlewares/validateEditProgram.js')
const {errorHandler} = require('../../middlewares/errorHandler.js')


const putProgram = async (event) => {
    const pk = event.pathParameters.pk;
    const sk = event.pathParameters.sk;

    if(!pk || !sk) {
        return sendError(404, {message: 'PK eller SK saknas'})
    }

    try {
        const { addExercises = [], removeExercises = []  } = JSON.parse(event.body)
        const response = await db.get({
            TableName: 'ergoprogram-db',
            Key: {
                pk: pk,
                sk: sk
            }
        })
        
        if(!response.Item) {
            return sendError(404, {message: 'Programmet hittades inte'})
        }

        const oldProgram = response.Item
        const oldExercises = oldProgram.exercises || []

        const updatedExercies = [
            ...oldExercises,
            ...addExercises.filter(exercise => !oldExercises.some( ex => ex.sk === exercise.sk ))
        ]

        const finalExercises = updatedExercies.filter(ex => !removeExercises.includes(ex.sk))

        const newProgram = {
            ...oldProgram,
            exercises: finalExercises
        }
        
        await db.put({
            TableName: 'ergoprogram-db',
            Item: newProgram
        })

        const updatedResponse = await db.get({
            TableName: 'ergoprogram-db',
            Key: { pk, sk },
        });


        return sendResponse(200, {message: 'Programmet är uppdaterat:', updatedProgram: updatedResponse})
    } catch(error) {
        return sendError(500, {message: error.message})
    }
}

const middyHandler = middy(putProgram)
exports.handler = middyHandler.use(validateKey()).use(validateEditProgram()).use(errorHandler())