const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const { validateKey } = require('../../middlewares/validateKey.js');
const {errorHandler} = require('../../middlewares/errorHandler.js')


const getUsers = async (event) => {
    const pk = event.pathParameters.pk;
    const sk = event.pathParameters.sk;

    if(!pk || !sk) {
        return sendError(404, {message: 'PK eller SK saknas'})
    }

    try {
        const data = await db.get({
            TableName: 'ergoprogram-db',
            Key: {
                pk: pk,
                sk: sk
            }
        })

        if(!data.Item) {
            return sendError(404, {message: 'Programmet hittades inte'})
        }

        return sendResponse(200, {success: true, data: data.Item})
    } catch(error) {
        return sendError(500, {message: error.message})
    }
}

const middyHandler = middy(getUsers)
exports.handler = middyHandler.use(validateKey()).use(errorHandler())