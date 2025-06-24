const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Firebase initialize (Check if already initialized to avoid errors on reload)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://badpinverify-fc046-default-rtdb.firebaseio.com",
  });
}

exports.handler = async (event, context) => {
  try {
    const deviceId = event.queryStringParameters.deviceId;
    if (!deviceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing deviceId parameter" }),
      };
    }

    const db = admin.database();
    const ref = db.ref("verifiedDevices/" + deviceId);
    const snapshot = await ref.once("value");
    const isVerified = snapshot.exists() && snapshot.val() === true;

    return {
      statusCode: 200,
      body: JSON.stringify({ verified: isVerified }),
    };
  } catch (error) {
    console.error("Error in checkVerification:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
