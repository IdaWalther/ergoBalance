const {db} = require('../../services/index.js')
const {sendError, sendResponseWithHeaders} = require('../../responses/index.js')
const middy = require('@middy/core')
const {errorHandler} = require('../../middlewares/errorHandler.js')
const {validateLogin} = require('../../middlewares/validateLogin.js')
const {validateKey} = require('../../middlewares/validateKey.js')
const {comparePassword, generateJWT} = require('../../utils/index.js')

const login = async (event) => {
    let body = JSON.parse(event.body)
    let {userdetails, password} = body

    userdetails = userdetails.toLowerCase();

    try {
        const {Items} = await db.scan({
            TableName: 'ergousers-db',
            FilterExpression: 'username = :username OR mail = :mail',
            ExpressionAttributeValues: {
                ':username': userdetails,
                ':mail': userdetails
            }
        })
        if (Items.length === 0) {
            return sendError(400, 'Användare existerar inte')
        }

        const user = Items[0]
        const isValid = await comparePassword(password, user.password)
        if(!isValid) {
            return sendError(400, 'Användarnamnet och lösenordet stämmer inte överens')
        }

        const token = await generateJWT(user)

        return sendResponseWithHeaders(
            200,
            {
                success: true,
                message: 'Använder inloggad',
                data: {
                    sk: user.sk,
                    username: user.username,
                    mail: user.mail
                }
            },
            token
        )
    } catch (error) {
        return sendError(500, error)
    }
}  

const middyHandler = middy(login)
exports.handler = middyHandler.use(validateKey()).use(validateLogin).use(errorHandler())