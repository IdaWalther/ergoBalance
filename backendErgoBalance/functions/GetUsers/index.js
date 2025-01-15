const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index');

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

exports.handler = getUsers