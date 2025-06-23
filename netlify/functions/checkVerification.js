// Simple in-memory store for demo, replace with DB or persistent store
let verifiedDevices = {};

exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  const deviceId = event.queryStringParameters?.deviceId;

  if (!deviceId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'deviceId required' })
    };
  }

  const isVerified = !!verifiedDevices[deviceId];

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ verified: isVerified })
  };
};
