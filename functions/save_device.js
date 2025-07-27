const fetch = require('node-fetch');

// In-memory storage (khali shuru hota hai)
let deviceVerifications = {};

exports.handler = async (event, context) => {
    const deviceId = event.queryStringParameters.device_id;
    const apiToken = 'cbbe1b32ade82de6e3edc049150a9e957f50132e'; // Tumhara API token
    const longUrl = `https://badpin.netlify.app/verify_success.html?device_id=${encodeURIComponent(deviceId)}`;
    const alias = 'BadTest_' + Math.random().toString(36).substring(2, 8);

    if (!deviceId) {
        return {
            statusCode: 302,
            headers: { Location: 'https://badpin.netlify.app/failed.html' },
            body: ''
        };
    }

    try {
        // ARLINKS API call
        const apiUrl = `https://arlinks.in/api?api=${apiToken}&url=${encodeURIComponent(longUrl)}&alias=${alias}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (result.status !== 'success') {
            return {
                statusCode: 302,
                headers: { Location: 'https://badpin.netlify.app/failed.html' },
                body: ''
            };
        }

        const shortenedUrl = result.shortenedUrl;

        // Save to in-memory storage
        deviceVerifications[deviceId] = {
            shortened_url: shortenedUrl,
            created_at: new Date().toISOString()
        };

        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'success', shortened_url: shortenedUrl })
        };
    } catch (error) {
        return {
            statusCode: 302,
            headers: { Location: 'https://badpin.netlify.app/failed.html' },
            body: ''
        };
    }
};
