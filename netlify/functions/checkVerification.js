// checkVerification.js
const { isDeviceVerified } = require('./verifiedDevices');

exports.handler = async function(event) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const deviceId = event.queryStringParameters?.deviceId;

  if (!deviceId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'deviceId required' }),
    };
  }

  const verified = isDeviceVerified(deviceId);

  return {
    statusCode: 200,
    body: JSON.stringify({ verified }),
  };
};
