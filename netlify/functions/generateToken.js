const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'StrongSecret!';
exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { deviceId, verification_token } = JSON.parse(event.body || '{}');
    if (!deviceId || !verification_token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing deviceId or verification_token' })
      };
    }
    const token = jwt.sign({ deviceId, verification_token }, JWT_SECRET, { expiresIn: '5m' });
    return {
      statusCode: 200,
      body: JSON.stringify({ token })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};