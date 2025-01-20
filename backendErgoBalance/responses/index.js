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

const sendResponseWithHeaders = (status, body, token) => {
    console.log ('sätter headers', token);

    return {
        statusCode: status,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'Content-Security-Policy': cspHeader,
        },
        body: JSON.stringify({
            data: body,
            token: token,
        })
    }
}

module.exports = {sendResponse, sendError, sendResponseWithHeaders};