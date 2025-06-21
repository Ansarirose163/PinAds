const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    const { deviceId, verification_token } = JSON.parse(event.body);
    if (!deviceId || !verification_token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing deviceId or verification_token' }),
      };
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    const token = jwt.sign(
      { deviceId, verification_token },
      JWT_SECRET,
      { expiresIn: '5m' }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    console.error('Token generation error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};