const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    const { long_url } = JSON.parse(event.body);
    if (!long_url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing long_url' }),
      };
    }

    const AIRLINK_API_KEY = process.env.AIRLINK_API_KEY;
    const response = await fetch('https://api.airlink.io/shorten', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${AIRLINK_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ long_url }),
    });

    const data = await response.json();
    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ short_url: data.short_url }),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error || 'Failed to shorten URL' }),
      };
    }
  } catch (error) {
    console.error('Airlink error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};