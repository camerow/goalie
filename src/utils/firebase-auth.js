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
    return new Promise((resolve, reject) => {
      // TODO: MS Login logic here...
    });
  },

  logout: () => {
    auth.signOut();
  }
};


export default firebaseAuth;