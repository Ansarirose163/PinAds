const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_SECRET_HERE';

exports.handler = async function(event) {
  try {
    const { deviceId, verification_token } = JSON.parse(event.body);

    if (!deviceId || !verification_token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Device ID and verification token are required.' }),
      };
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
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
