exports.handler = async function(event) {
    const vid = event.queryStringParameters.vid;
    if (vid && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(vid)) {
        return {
            statusCode: 200,
            body: JSON.stringify({ status: "verified" })
        };
    }
    return { statusCode: 400, body: JSON.stringify({ status: "failed", message: "Invalid or missing verification ID" }) };
};
