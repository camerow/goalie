import Firebase from 'firebase';
import config from './firebase-config';

const rootRef = Firebase.initializeApp(config);
const auth = Firebase.auth();
const database = Firebase.database();

export {
    rootRef,
    auth,
    database
};