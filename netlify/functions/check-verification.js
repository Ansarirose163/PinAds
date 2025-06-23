exports.handler = async (event) => {
    const { deviceId } = event.queryStringParameters || {};
    // Dummy logic, replace with real verification logic
    const verified = deviceId === "test-device-123"; // Example: test-device-123 ke liye true
    return {
        statusCode: 200,
        body: JSON.stringify({ verified }),
    };
};
