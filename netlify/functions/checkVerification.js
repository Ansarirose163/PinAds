const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, 'verified-devices.json');
exports.handler = async function(event) {
  const deviceId = event.queryStringParameters?.deviceId;
  if (!deviceId) {
    return { statusCode: 400, body: 'Missing deviceId' };
  }
  let data = {};
  if (fs.existsSync(DB_PATH)) {
    data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  }
  const verified = !!data[deviceId];
  return {
    statusCode: 200,
    body: JSON.stringify({ verified })
  };
};
