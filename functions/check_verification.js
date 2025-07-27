// In-memory storage (khali shuru hota hai)
let deviceVerifications = {};

exports.handler = async (event, context) => {
    const deviceId = event.queryStringParameters.device_id;

    if (!deviceId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ status: 'error', message: 'No device ID provided' })
        };
    }

    try {
        if (deviceVerifications[deviceId]) {
            return {
                statusCode: 200,
                body: JSON.stringify({ status: 'verified' })
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({ status: 'not_verified' })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'error', message: error.message })
        };
    }
};
