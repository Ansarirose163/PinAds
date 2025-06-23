// Same in-memory store as checkVerification.js, keep in shared file or DB in prod
const verifiedDevices = require('./verifiedDevices'); // you need to share or use DB

exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html',
  };

  const deviceId = event.queryStringParameters && event.queryStringParameters.deviceId;
  if (!deviceId) {
    return {
      statusCode: 400,
      headers,
      body: '<h1>deviceId query param required</h1>',
    };
  }

  // Mark device verified
  verifiedDevices.add(deviceId);

  return {
    statusCode: 200,
    headers,
    body: `<html><body><h1>Verification Success!</h1><p>You may now return to the app.</p></body></html>`,
  };
};
