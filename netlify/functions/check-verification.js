const { nanoid } = require('nanoid');
let verificationCache = {};

exports.handler = async (event) => {
    const { deviceId } = event.queryStringParameters || {};
    
    if (!deviceId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Device ID required" })
        };
    }

    try {
        // Agar pehle se cache mein nahi hai toh naya entry banaye
        if (!verificationCache[deviceId]) {
            verificationCache[deviceId] = {
                verified: false,
                token: `${deviceId}-${nanoid(10)}`,
                timestamp: Date.now()
            };
            
            // 5 second ke baad automatically verify ho jayega (demo ke liye)
            setTimeout(() => {
                verificationCache[deviceId].verified = true;
            }, 5000);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                verified: verificationCache[deviceId].verified,
                token: verificationCache[deviceId].token,
                message: verificationCache[deviceId].verified 
                    ? "Device verified successfully" 
                    : "Verification in progress"
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
