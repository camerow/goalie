import Firebase from 'firebase';
import config from './firebase-config';

let rootRef = Firebase.initializeApp(config);
let auth = Firebase.auth();
let database = Firebase.database();

export {
    rootRef,
    auth,
    database
}