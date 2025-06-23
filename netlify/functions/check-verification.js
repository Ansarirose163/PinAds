const verificationDB = new Map();

exports.handler = async (event) => {
    const { deviceId } = event.queryStringParameters || {};
    
    if (!deviceId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Device ID required" })
        };
    }

    try {
        const verification = verificationDB.get(deviceId) || { verified: false };
        return {
            statusCode: 200,
            body: JSON.stringify({
                verified: verification.verified,
                deviceId: deviceId
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
