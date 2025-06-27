exports.handler = async function(event) {
    const vid = event.queryStringParameters && event.queryStringParameters.vid;
    console.log('Received device ID:', vid); // For debugging
    if (vid && vid.length >= 16) {
        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ status: 'verified' })
        };
    }
    return {
        statusCode: 400,
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ status: 'failed', message: 'Invalid or missing device ID' })
    };
};
