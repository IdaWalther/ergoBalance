const {db} = require('../../services/index.js');
const {sendResponse, sendError } = require('../../responses/index.js');
const middy = require('@middy/core')
const { validateKey } = require('../../middlewares/validateKey.js');
const {errorHandler} = require('../../middlewares/errorHandler.js')


const deleteExercise = async (event) => {
    
}

const middyHandler = middy(deleteExercise)
exports.handler = middyHandler.use(validateKey()).use(errorHandler())