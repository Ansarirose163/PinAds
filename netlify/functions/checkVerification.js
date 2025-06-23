const { isDeviceVerified } = require('./verifiedDevices');

exports.handler = async function(event) {
  const { deviceId } = event.queryStringParameters;

  return {
    statusCode: 200,
    body: JSON.stringify({ verified: isDeviceVerified(deviceId) })
  };
};
