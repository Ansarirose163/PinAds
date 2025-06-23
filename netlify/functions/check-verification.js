const { nanoid } = require('nanoid'); // For unique token generation (install via npm)

exports.handler = async (event) => {
    const { deviceId } = event.queryStringParameters || {};

    if (!deviceId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "No deviceId provided" }),
        };
    }

    try {
        // Simulate verification process (replace with real DB logic)
        const verificationCache = {}; // In-memory cache (use real DB in production)
        let verified = false;

        // Check if deviceId exists in cache or simulate verification
        if (verificationCache[deviceId]) {
            verified = verificationCache[deviceId].verified;
        } else {
            // Simulate delay and verification (e.g., 5 seconds max)
            await new Promise(resolve => setTimeout(resolve, Math.random() * 5000));
            verified = Math.random() > 0.3; // 70% success rate
            verificationCache[deviceId] = { verified, timestamp: Date.now() };
        }

        // Generate a unique token for this verification
        const token = `${deviceId}-${nanoid(10)}`;

        // Return response
        const response = {
            message: `Verification status for ${deviceId}: ${verified ? "Success" : "Pending"}`,
            verified,
            token,
        };

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache", // Prevent caching issues
            },
            body: JSON.stringify(response),
        };

    } catch (error) {
        console.error(`Error processing verification for ${deviceId}:`, error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Internal server error: ${error.message}` }),
        };
    }
};
