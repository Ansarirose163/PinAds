// verifiedDevices.js
// Simple in-memory verified device list (demo purpose)

const verifiedDevices = new Set();

function addDevice(deviceId) {
  verifiedDevices.add(deviceId);
}

function isDeviceVerified(deviceId) {
  return verifiedDevices.has(deviceId);
}

module.exports = { addDevice, isDeviceVerified };
