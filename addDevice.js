const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://badpinverify-fc046-default-rtdb.firebaseio.com'
});

const db = admin.database();
const ref = db.ref('verifiedDevices');

const deviceId = 'eaf400fd0094fc9f';

ref.child(deviceId).set(true)
  .then(() => {
    console.log('✅ Device added successfully!');
  })
  .catch((error) => {
    console.error('❌ Error adding device:', error);
  });
