const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, 'verified-devices.json');
exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { deviceId } = JSON.parse(event.body || '{}');
    if (!deviceId) {
      return { statusCode: 400, body: 'Missing deviceId' };
    }
    let data = {};
    if (fs.existsSync(DB_PATH)) {
      data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    }
    data[deviceId] = true;
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};