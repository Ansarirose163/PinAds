const admin = require('firebase-admin');

const firebaseConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
};

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig)
    });
}

const db = admin.firestore();

exports.handler = async function(event, context) {
    const deviceId = event.queryStringParameters.device_id;

    if (!deviceId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ status: 'error', error: 'No device ID provided' })
        };
    }

    try {
        const docRef = db.collection('device_verifications').doc(deviceId);
        const doc = await docRef.get();

        if (doc.exists) {
            await docRef.delete();
            return {
                statusCode: 200,
                body: JSON.stringify({ status: 'deleted' })
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ status: 'error', error: 'Device ID not found' })
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'error', error: 'Failed to delete device ID' })
        };
    }
};
