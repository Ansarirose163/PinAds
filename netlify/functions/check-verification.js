exports.handler = async (event) => {
  try {
    const { deviceId } = event.queryStringParameters;

    if (!deviceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing deviceId' }),
      };
    }

    global.verifiedDevices = global.verifiedDevices || {};
    const device = global.verifiedDevices[deviceId];
    const verified = device && device.verified && device.expires > Date.now();

    return {
      statusCode: 200,
      body: JSON.stringify({ verified }),
    };
  } catch (error) {
    console.error('Check verification error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};