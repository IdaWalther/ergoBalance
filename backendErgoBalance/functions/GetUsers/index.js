const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const { validateKey } = require('../../middlewares/validateKey.js');
const {errorHandler} = require('../../middlewares/errorHandler.js')


const getUsers = async (event) => {
  try {
    const data = await db.scan({
      TableName: 'ergousers-db'
    })
    return sendResponse(200, {success: true, data: data.Items})
  } catch(error) {
    return sendError(500, {message: error.message})
  }
}

const middyHandler = middy(getUsers)
exports.handler = middyHandler.use(validateKey()).use(errorHandler())