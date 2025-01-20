const { sendResponse } = require('../responses/index.js');

const errorHandler = () => {
    return {
        onError: async(handler) => {
            const {error} = handler;
            console.log('Error', error)
        handler.response = sendResponse(404, handler.error.message)
        }
    }
}

module.exports = {errorHandler}