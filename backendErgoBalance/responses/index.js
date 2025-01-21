const cspHeader = "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; object-src 'none';";

function sendResponse(status, data) {
    return {
        statusCode : status,
        headers: {
            'Content-Type' : 'application/json',
            'Content-Security-Policy': cspHeader,
        },
        body: JSON.stringify(data)
    }
}

function sendError(status, data) {
    return {
        statusCode: status,
        headers: {
            'Content-Type': 'application/json',
            'Content-Security-Policy': cspHeader,
        },
        body: JSON.stringify({success : false, data })
    };
}

const sendResponseWithHeaders = (status, body) => {
    return {
        statusCode: status,
        headers: {
            'Content-Type': 'application/json',
            'Content-Security-Policy': cspHeader,
        },
        body: JSON.stringify({
            data: body
        }),
    };
}

module.exports = {sendResponse, sendError, sendResponseWithHeaders};