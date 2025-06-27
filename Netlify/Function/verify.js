exports.handler = async function(event) {
    const vid = event.queryStringParameters.vid;
    if (vid) {
        return {
            statusCode: 200,
            body: JSON.stringify({ status: "verified" })
        };
    }
    return { statusCode: 400, body: "Invalid verification ID" };
};
