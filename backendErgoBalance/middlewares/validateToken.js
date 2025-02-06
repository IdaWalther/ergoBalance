const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = () => ({
    before: (handler) => {
        const token = handler.event.authorization && handler.event.headers.authorization.split('')[1]
        console.log('Validate:', token)
        const decodedToken = jwt.verify(token, process.env.SECRET_ACCESS_KEY)

        if(!decodedToken) {
            throw new Error('Ogiltig token')
        }
        return
    },
});

module.exports = { validateToken };