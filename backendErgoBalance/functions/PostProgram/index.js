const { errorHandler } = require('../../middlewares/errorHandler')
const { validateKey } = require('../../middlewares/validateKey')
const { validateProgram } = require('../../middlewares/validateProgram')
const { sendError, sendResponse } = require('../../responses/index')
const middy = require('@middy/core')
const { db } = require('../../services/index')
const {v4: uuid} = require('uuid')

const postProgram = async (event) => {
    const { userId, name, desc, program } = JSON.parse(event.body)
    const sk =  uuid();
    
    try {
        await db.put({
            TableName: 'ergoProgram-db',
            Item: {
                pk: userId,
                sk: sk,
                name: name,
                desc: desc,
                program: program
            }
        })
        return sendResponse(200, {
            body: {
                success: true,
                message: 'Nytt program registrerat',
                data: {
                    pk: userId,
                    sk: sk,
                    name: name,
                    desc: desc,
                    program: program
                }
            }
        })
    } catch(error) {
        return sendError(404, {message: 'Kunde inte registrera nytt program'})
    }
}

const middyHandler = middy(postProgram)
exports.handler = middyHandler.use(validateKey()).use(validateProgram()).use(errorHandler())