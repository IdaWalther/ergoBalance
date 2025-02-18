const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const { validateKey } = require('../../middlewares/validateKey.js');
const { validateEditUser } = require('../../middlewares/validateEditUser.js')
const {errorHandler} = require('../../middlewares/errorHandler.js')


const putUser = async (event) => {
    const pk = event.pathParameters.pk;
    const sk = event.pathParameters.sk;

    if(!pk || !sk) {
        return sendError(404, {message: 'PK eller SK saknas'})
    }

    try {
        const {program} = JSON.parse(event.body)
        const response = await db.get({
            TableName: 'ergousers-db',
            Key: {
                pk: pk,
                sk: sk
            }
        })

        if(!response.Item) {
            return sendError(404, {message: 'Användaren hittades inte'})
        }

        const oldProgram = response.Item.program;

        const updatedProgram = oldProgram.map((programItem) => {
            if (programItem.pk === program[0].pk) {
                programItem.exercises = program[0].exercises.map((updatedExercise) => {
                    const existingExercise = programItem.exercises.find(exercise => exercise.sk === updatedExercise.sk);
                    if (existingExercise) {
                        return {
                            ...existingExercise,
                            ...updatedExercise, 
                        };
                    }
                    return updatedExercise;
                });
                return programItem; 
            }
            return programItem; 
        });

        const newProgram = {
            ...response.Item,
            program: updatedProgram
        }

        await db.put({
            TableName: 'ergousers-db',
            Item: newProgram
        })

        return sendResponse(200, {message: 'Programmet är uppdaterad:', updatedProgram: newProgram.program})
    } catch(error) {
        return sendError(500, {message: error.message})
    }
}

const middyHandler = middy(putUser)
exports.handler = middyHandler.use(validateKey()).use(validateEditUser()).use(errorHandler())