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
    if (!AIRLINK_API_KEY) {
      throw new Error('AIRLINK_API_KEY not configured');
    }

    const apiUrl = `https://arlinks.in/api?api=${AIRLINK_API_KEY}&url=${encodeURIComponent(long_url)}&format=text`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'text/plain' },
    });

    const text = await response.text();
    if (response.ok && text.startsWith('https://arlinks.in/')) {
      return {
        statusCode: 200,
        body: JSON.stringify({ short_url: text.trim() }),
      };
    } else {
      // Fallback to JSON response for error details
      const jsonResponse = await fetch(`${apiUrl}&format=json`);
      const jsonData = await jsonResponse.json();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: jsonData.message || 'Failed to shorten URL' }),
      };
    }
  } catch (error) {
    console.error('Airlink error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error: ' + error.message }),
    };
  }
};
