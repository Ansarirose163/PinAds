// Simple in-memory store for verified devices (reset on deploy/restart)
const verifiedDevices = new Set();

function addDevice(deviceId) {
  verifiedDevices.add(deviceId);
}

function isVerified(deviceId) {
  return verifiedDevices.has(deviceId);
}

module.exports = { addDevice, isVerified };
