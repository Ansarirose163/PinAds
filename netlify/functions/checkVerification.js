const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://badpinverify-default-rtdb.firebaseio.com"
  });
}

exports.handler = async function (event) {
  const { deviceId } = event.queryStringParameters;

  if (!deviceId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing deviceId" })
    };
  }

  try {
    const snapshot = await admin.database().ref(`verifiedDevices/${deviceId}`).once('value');
    const data = snapshot.val();
    return {
      statusCode: 200,
      body: JSON.stringify({ verified: !!(data && data.verified) })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};