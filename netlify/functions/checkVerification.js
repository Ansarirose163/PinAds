// Simple in-memory store for demonstration (replace with DB in prod)
const verifiedDevices = new Set();

exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  const deviceId = event.queryStringParameters && event.queryStringParameters.deviceId;
  if (!deviceId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'deviceId required' }),
    };
  }

  // Return verification status
  const verified = verifiedDevices.has(deviceId);
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ verified }),
  };
};
