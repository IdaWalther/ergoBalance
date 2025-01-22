const { errorHandler } = require('../../middlewares/errorHandler')
const { validateKey } = require('../../middlewares/validateKey')
const {validateNewUser} = require('../../middlewares/validateNewUser')
const { sendError, sendResponse } = require('../../responses/index')
const middy = require('@middy/core')
const { db } = require('../../services/index')
const { hashPassword } = require('../../utils/index')
const {v4: uuid} = require('uuid')

const postNewUser = async (event) => {
    const body = JSON.parse(event.body)
    let {username, email, password, confirmPassword} = body;

    username = username.toLowerCase();
    email = email.toLowerCase();

    if(password !== confirmPassword) {
        return sendError(400, {message: 'Lösenorden måste vara lika'})
    }

    const hashedPassword = await hashPassword(password)
    const id = uuid()
    
    try {
        const {Items} = await db.scan({
            TableName: 'ergousers-db',
            FilterExpression: 'username = :username OR mail = :mail',
            ExpressionAttributeValues: {
                ':username': username,
                ':mail': email
            } 
        })

        if(Items.length > 0) {
            return sendError(400, {message: 'Användaren existerar redan'})
        }

        await db.put({
            TableName: 'ergousers-db',
            Item: {
                pk: 'user',
                sk: id,
                username: username,
                password: hashedPassword,
                mail: email
            }
        })
        return sendResponse(200, {
            body: {
                success: true,
                message: 'Ny användare registrerad',
                data: {
                    pk: 'user',
                    sk: id,
                    username: username,
                    mail: email
                }
            }
        })
    } catch(error) {
        return sendError(404, {message: 'Kunde inte registrera ny användare'})
    }
}

const middyHandler = middy(postNewUser)
exports.handler = middyHandler.use(validateKey()).use(validateNewUser()).use(errorHandler())