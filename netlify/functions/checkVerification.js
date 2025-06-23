const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://badpinverify-fc046-default-rtdb.firebaseio.com"
  });
}

exports.handler = async function (event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  const { deviceId } = event.queryStringParameters;

  if (!deviceId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Missing deviceId" }),
    };
  }

  try {
    const snapshot = await admin.database().ref(`verifiedDevices/${deviceId}`).once("value");
    const data = snapshot.val();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ verified: data?.verified === true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
