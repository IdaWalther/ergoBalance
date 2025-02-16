const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const { validateKey } = require('../../middlewares/validateKey.js');
const {errorHandler} = require('../../middlewares/errorHandler.js')


const putExercise = async (event) => {
    
}

const middyHandler = middy(putExercise)
exports.handler = middyHandler.use(validateKey()).use(errorHandler())