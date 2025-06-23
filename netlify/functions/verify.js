exports.handler = async (event) => {
    const { token } = event.queryStringParameters || {};
    if (!token) return { statusCode: 400, body: JSON.stringify({ error: "No token provided" }) };

    // Extract deviceId from token (example parsing)
    const deviceId = token.split("-")[0] || "unknown"; // Dynamic deviceId
    const verified = Math.random() > 0.3; // Random verification for demo (replace with real logic)

    let customMessage = `Verification Successful for ${deviceId}! You can now use PinAds.`;
    if (!verified) {
        customMessage = `Verification Failed for ${deviceId}. Please try again.`;
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: customMessage, verified }),
    };
};
