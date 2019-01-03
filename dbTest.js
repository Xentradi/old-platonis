const admin = require('firebase-admin');
let serviceAccount = require('./platonis-x3n-a3bb8b7802df.json');


admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

var docRef = db.collection('users').doc('alovelace');

docRef.set({
	first: 'Ada',
	last: 'Lovelace',
	born: 1815,
});