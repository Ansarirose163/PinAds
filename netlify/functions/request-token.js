const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  try {
    console.log('Request received:', event);

    if (event.httpMethod !== 'POST') {
      console.error('Invalid method:', event.httpMethod);
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      console.error('Invalid JSON body:', event.body);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON body' }),
      };
    }

    const { deviceId, verification_token } = body;
    if (!deviceId || !verification_token) {
      console.error('Missing fields:', { deviceId, verification_token });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing deviceId or verification_token' }),
      };
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('JWT_SECRET not configured');
      throw new Error('JWT_SECRET not configured');
    }

    const token = jwt.sign(
      { deviceId, verification_token },
      JWT_SECRET,
      { expiresIn: '5m' }
    );

    console.log('Token generated for deviceId:', deviceId);
    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    console.error('Token generation error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error: ' + error.message }),
    };
  }
};
