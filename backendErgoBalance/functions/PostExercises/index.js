const { errorHandler } = require('../../middlewares/errorHandler')
const { validateKey } = require('../../middlewares/validateKey')
const { validateExercises } = require('../../middlewares/validateExercises')
const { sendError, sendResponse } = require('../../responses/index')
const middy = require('@middy/core')
const { db } = require('../../services/index')

const {v4: uuid} = require('uuid')
const { required } = require('joi')

const postExercises = async (event) => {
    const body = JSON.parse(event.body)
    let {name, desc, image, pk} = body;
    const id = uuid()
    
    try {
        await db.put({
            TableName: 'ergoexcercises-db',
            Item: {
                pk: pk,
                sk: id,
                name: name,
                desc: desc,
                image: image
            }
        })
        return sendResponse(200, {
            body: {
                success: true,
                message: 'Ny övning registrerad',
                data: {
                    pk: pk,
                    sk: id,
                    name: name,
                    desc: desc,
                    image: image
                }
            }
        })
    } catch(error) {
        return sendError(404, {message: 'Kunde inte registrera ny övning'})
    }
}

const middyHandler = middy(postExercises)
exports.handler = middyHandler.use(validateKey()).use(validateExercises()).use(errorHandler())