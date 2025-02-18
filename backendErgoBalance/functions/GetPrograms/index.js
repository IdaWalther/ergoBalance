const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const { validateKey } = require('../../middlewares/validateKey.js');
const {errorHandler} = require('../../middlewares/errorHandler.js')


const getPrograms = async (event) => {
    const pk = event.pathParameters.pk;

    if(!pk) {
        return sendError(404, {message: 'PK saknas'})
    }
    try {
        const data = await db.scan({
            TableName: 'ergoprogram-db',
            FilterExpression: 'pk = :pk',
            ExpressionAttributeValues: {
                ':pk': pk
            }
        })
        return sendResponse(200, {success: true, data: data.Items})
    } catch(error) {
        return sendError(500, {message: error.message})
    }
}

const middyHandler = middy(getPrograms)
exports.handler = middyHandler.use(validateKey()).use(errorHandler())