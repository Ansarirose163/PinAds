const { nanoid } = require('nanoid');

// In-memory storage for demo (replace with DB in production)
const verificationStore = {};

exports.handler = async (event) => {
    const { deviceId } = event.queryStringParameters || {};
    
    if (!deviceId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Device ID required" })
        };
    }

    try {
        // Initialize if not exists
        if (!verificationStore[deviceId]) {
            verificationStore[deviceId] = {
                verified: false,
                token: `${deviceId}-${nanoid(10)}`,
                createdAt: Date.now()
            };
            
            // Simulate verification after 5 seconds (replace with actual verification logic)
            setTimeout(() => {
                verificationStore[deviceId].verified = true;
            }, 5000);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                verified: verificationStore[deviceId].verified,
                token: verificationStore[deviceId].token,
                message: verificationStore[deviceId].verified 
                    ? "Verification successful" 
                    : "Verification in progress (5 seconds)"
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
