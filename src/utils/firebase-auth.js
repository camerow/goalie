import {
  rootRef,
  auth,
  database,
} from './firebase-refs';

const firebaseAuth = {
  loginWithPW: ({ email, password }, errorCallback) => {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password)
        .then((res) => {
            return resolve(res);
        })
        .catch(error => {
          return reject(error);
        });
    })
  },

  loginWithMicrosoftAD: () => {
    // client-id: 52a7830c-1d12-4652-8b4b-62ea84d7dd68
    return new Promise((resolve, reject) => {
      // create user id
      var userID = database.rootRef().child('users').push().key;


      // TODO: MS Login logic here...
    });
  },

  logout: () => {
    auth.signOut();
  }
};


export default firebaseAuth;