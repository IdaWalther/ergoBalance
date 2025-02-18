const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const { validateKey } = require('../../middlewares/validateKey.js');
const {errorHandler} = require('../../middlewares/errorHandler.js')


const deleteExercise = async (event) => {
        const pk = event.pathParameters.pk;
        const sk = event.pathParameters.sk;
    
        if(!pk || !sk) {
            return sendError(404, {message: 'PK eller SK saknas'})
        }
    
        try {
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
            
            await db.delete({
                TableName: 'ergoexcercises-db',
                Key: {
                    pk: pk,
                    sk: sk
                }
            })
            return sendResponse(200, {message: 'Övningen raderad'})

        } catch(error) {
            return sendError(500, {message: error.message})
        }
}

const middyHandler = middy(deleteExercise)
exports.handler = middyHandler.use(validateKey()).use(errorHandler())