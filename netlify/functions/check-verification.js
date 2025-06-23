exports.handler = async (event) => {
    const { deviceId } = event.queryStringParameters || {};
    
    if (!deviceId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Device ID required" })
        };
    }

    try {
        // In production, replace with actual database check
        const verified = Math.random() > 0.3; // 70% success rate

        return {
            statusCode: 200,
            body: JSON.stringify({
                verified,
                message: verified ? "Device verified" : "Verification pending"
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
