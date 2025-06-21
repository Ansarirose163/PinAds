const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
  try {
    const { token } = event.queryStringParameters;

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing token' }),
      };
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { deviceId } = decoded;

    // Simulate storing verification status
    global.verifiedDevices = global.verifiedDevices || {};
    global.verifiedDevices[deviceId] = { verified: true, expires: Date.now() + 5 * 60 * 1000 };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: '<html><head><meta http-equiv="refresh" content="0;url=/success.html"></head><body></body></html>',
    };
  } catch (error) {
    console.error('Verification error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};