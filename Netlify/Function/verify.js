const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'StrongSecret!';

exports.handler = async function(event) {
    console.log('Received request:', event);
    if (event.httpMethod !== 'POST') {
        console.error('Method not allowed:', event.httpMethod);
        return { 
            statusCode: 405, 
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
    try {
        const { deviceId, verification_token } = JSON.parse(event.body || '{}');
        console.log('Parsed body:', { deviceId, verification_token });
        if (!deviceId || !verification_token) {
            console.error('Missing parameters:', { deviceId, verification_token });
            return {
                statusCode: 400,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Missing deviceId or verification_token' })
            };
        }
        const token = jwt.sign({ deviceId, verification_token }, JWT_SECRET, { expiresIn: '5m' });
        console.log('Generated JWT:', token);
        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ token })
        };
    } catch (err) {
        console.error('Server error:', err.message);
        return { 
            statusCode: 500, 
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: err.message })
        };
    }
};
