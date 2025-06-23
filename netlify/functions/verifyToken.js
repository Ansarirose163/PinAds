const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'D9f$Gk&hLp@z$sWc!z%C*F-JaNdRgUjX';

exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  try {
    const { token } = JSON.parse(event.body);
    const payload = jwt.verify(token, JWT_SECRET);
    const deviceId = payload.deviceId;

    // ✅ Here mark as verified — e.g. store in a file or DB
    // For now, we simulate success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "ok", deviceId })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ status: "error", message: error.message })
    };
  }
};
