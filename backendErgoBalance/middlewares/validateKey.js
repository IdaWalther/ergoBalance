const {keys} = require('../data/keys.js')
const {sendError } = require('../responses/index');

const validateKey = () => ({
    before: (handler) => {
        const {key} = handler.event.queryStringParameters;
        if(!key) {
            return sendError(401, {message: 'Du behöver ange en API-nyckel'})
        }
        if(!keys.some(i => i === key)) {
            return sendError(401, {message: 'Fel API-nyckel'})
        }
        return;
    }
})

module.exports = {validateKey}