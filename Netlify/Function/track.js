exports.handler = async function(event) {
    console.log('Received track request:', event);
    if (event.httpMethod !== 'POST') {
        console.error('Method not allowed:', event.httpMethod);
        return { 
            statusCode: 405, 
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
    try {
        const { deviceId, verification_token, timestamp } = JSON.parse(event.body || '{}');
        console.log('Tracking data:', { deviceId, verification_token, timestamp });
        if (!deviceId || !verification_token || !timestamp) {
            console.error('Missing parameters:', { deviceId, verification_token, timestamp });
            return {
                statusCode: 400,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Missing deviceId, verification_token, or timestamp' })
            };
        }
        // Simulate logging to a database or external service
        console.log('Tracked successfully:', { deviceId, verification_token, timestamp });
        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ status: 'tracked' })
        };
    } catch (err) {
        console.error('Track error:', err.message);
        return { 
            statusCode: 500, 
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: err.message })
        };
    }
};
