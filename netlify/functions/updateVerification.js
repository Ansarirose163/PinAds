// updateVerification.js
const { addDevice } = require('./verifiedDevices');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const data = JSON.parse(event.body || '{}');
  const deviceId = data.deviceId;

  if (!deviceId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'deviceId required' }),
    };
  }

  addDevice(deviceId);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
