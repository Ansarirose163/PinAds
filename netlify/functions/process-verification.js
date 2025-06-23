const { nanoid } = require('nanoid');
const verificationDB = new Map();

exports.handler = async (event) => {
    const { deviceId } = event.queryStringParameters || {};
    
    if (!deviceId) {
        return {
            statusCode: 302,
            headers: {
                "Location": "/failed.html?reason=invalid_request"
            }
        };
    }

    try {
        // Simulate verification process (success after 5 seconds)
        setTimeout(() => {
            verificationDB.set(deviceId, {
                verified: true,
                timestamp: Date.now()
            });
        }, 5000);

        return {
            statusCode: 302,
            headers: {
                "Location": "/verifying.html?deviceId=" + deviceId
            }
        };
    } catch (error) {
        return {
            statusCode: 302,
            headers: {
                "Location": "/failed.html?reason=server_error"
            }
        };
    }
};
