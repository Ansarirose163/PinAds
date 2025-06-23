const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://badpinverify-default-rtdb.firebaseio.com"
  });
}

exports.handler = async function (event) {
  const { deviceId } = JSON.parse(event.body || '{}');

  if (!deviceId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing deviceId" })
    };
  }

  try {
    await admin.database().ref(`verifiedDevices/${deviceId}`).set({
      verified: true,
      timestamp: Date.now()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};