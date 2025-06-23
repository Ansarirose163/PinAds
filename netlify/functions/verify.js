exports.handler = async (event) => {
    const { token } = event.queryStringParameters || {};
    if (!token) return { statusCode: 400, body: JSON.stringify({ error: "No token provided" }) };
    // Dummy logic, replace with real verification
    const verified = token.includes("test-device-123"); // Example condition
    // Update some storage or database here to mark as verified
    return {
        statusCode: 200,
        body: JSON.stringify({ verified }),
    };
};
