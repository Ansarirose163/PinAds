const { nanoid } = require('nanoid');

// Database simulation
const verificationDB = new Map();

exports.handler = async (event) => {
    const { deviceId } = event.queryStringParameters || {};
    
    if (!deviceId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ 
                error: "Device ID required",
                verified: false,
                verificationStep: 0 
            })
        };
    }

    try {
        if (!verificationDB.has(deviceId)) {
            // Initialize new verification
            verificationDB.set(deviceId, {
                step: 1,
                token: nanoid(32),
                startTime: Date.now(),
                verified: false
            });
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    verified: false,
                    verificationStep: 1,
                    message: "Verification started"
                })
            };
        }

        const verification = verificationDB.get(deviceId);
        
        // Progressive verification - minimum 3 steps with delays
        if (verification.step < 3) {
            verification.step++;
            verificationDB.set(deviceId, verification);
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    verified: false,
                    verificationStep: verification.step,
                    message: `Verification step ${verification.step}/3`
                })
            };
        }

        // Only verify after all steps + minimum 8 seconds
        if (Date.now() - verification.startTime >= 8000) {
            verification.verified = true;
            verificationDB.set(deviceId, verification);
            
            return {
                statusCode: 200,
                body: JSON.stringify({
                    verified: true,
                    verificationStep: 4,
                    message: "Verification complete"
                })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                verified: false,
                verificationStep: verification.step,
                message: "Finalizing verification..."
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: error.message,
                verified: false,
                verificationStep: 0
            })
        };
    }
};
