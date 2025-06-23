const { nanoid } = require('nanoid');

// In-memory storage (replace with DB in production)
const verifications = {};

exports.handler = async (event) => {
    const { deviceId } = event.queryStringParameters || {};
    
    if (!deviceId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ 
                error: "Device ID required",
                verified: false,
                verificationStarted: false
            })
        };
    }

    try {
        // Initialize verification if not exists
        if (!verifications[deviceId]) {
            verifications[deviceId] = {
                verified: false,
                verificationStarted: false,
                token: nanoid(32),
                timestamp: Date.now()
            };
            
            // Simulate verification delay (8-15 seconds)
            const delay = 8000 + Math.random() * 7000;
            setTimeout(() => {
                verifications[deviceId].verified = true;
                verifications[deviceId].verificationStarted = true;
                console.log(`Device ${deviceId} fully verified at ${new Date()}`);
            }, delay);
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    verified: false,
                    verificationStarted: false,
                    message: "Verification process started"
                })
            };
        }

        // After initialization
        return {
            statusCode: 200,
            body: JSON.stringify({
                verified: verifications[deviceId].verified,
                verificationStarted: verifications[deviceId].verificationStarted,
                message: verifications[deviceId].verified 
                    ? "Verification completed successfully" 
                    : "Verification in progress"
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: error.message,
                verified: false,
                verificationStarted: false
            })
        };
    }
};
