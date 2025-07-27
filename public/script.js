async function shortenUrl(deviceId) {
    try {
        const response = await fetch(`/.netlify/functions/save_device?device_id=${encodeURIComponent(deviceId)}`);
        const data = await response.json();
        if (data.status === 'success') {
            window.location.href = data.shortened_url;
        } else {
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').textContent = data.message || 'Error shortening URL';
        }
    } catch (error) {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = 'Network error: ' + error.message;
    }
}
