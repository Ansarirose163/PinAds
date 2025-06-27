exports.handler = async function(event) {
    const vid = event.queryStringParameters && event.queryStringParameters.vid;
    console.log('Received device ID:', vid); // Log for debugging
    if (vid && vid.trim() !== '') {
        console.log('Device ID validated successfully');
        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ status: 'verified' })
        };
    }
    console.error('Invalid or missing device ID:', vid);
    return {
        statusCode: 400,
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ status: 'failed', message: 'Invalid or missing device ID' })
    };
};
