const { addDevice } = require('./verifiedDevices');

exports.handler = async function(event) {
  try {
    const { deviceId } = JSON.parse(event.body);

    if (!deviceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Device ID required" }),
      };
    }

    addDevice(deviceId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
