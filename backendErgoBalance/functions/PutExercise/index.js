const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const { validateKey } = require('../../middlewares/validateKey.js');
const { validateEditExercises } = require('../../middlewares/validateEditExercises.js')
const {errorHandler} = require('../../middlewares/errorHandler.js')


const putExercise = async (event) => {
    const pk = event.pathParameters.pk;
    const sk = event.pathParameters.sk;

    if(!pk || !sk) {
        return sendError(404, {message: 'PK eller SK saknas'})
    }

    try {
        const {name, desc, image} = JSON.parse(event.body)
        console.log('Information som man vill ändra:', {pk, name, desc, image})
        const response = await db.get({
            TableName: 'ergoexcercises-db',
            Key: {
                pk: pk,
                sk: sk
            }
        })

        if(!response.Item) {
            return sendError(404, {message: 'Övning hittades inte'})
        }

        const oldExercise = response.Item;

        const newExercise = {
            ...oldExercise,
            ...(name !== undefined && {name}),
            ...(desc !== undefined && {desc}),
            ...(image !== undefined && {image})
        }
        
        await db.put({
            TableName: 'ergoexcercises-db',
            Item: newExercise
        })

        const updatedExercise = await db.query({
            TableName: 'ergoexcercises-db',
            KeyConditionExpression: 'pk = :pk AND sk = :sk',
            ExpressionAttributeValues: {
                ':pk' : pk,
                ':sk' : sk
            }
        })

        return sendResponse(200, {message: 'Övningen är uppdaterad:', updatedExercise: updatedExercise.Items})
    } catch(error) {
        return sendError(500, {message: error.message})
    }
}

const middyHandler = middy(putExercise)
exports.handler = middyHandler.use(validateKey()).use(validateEditExercises()).use(errorHandler())