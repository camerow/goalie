import {
    database,
    auth,
    rootRef
} from './firebase-refs';

const updateUserData = function(newUser){
  const key = newUser.uid;
  rootRef.child('user').child(key).set(newUser);
};

const createUser = ({email, password, firstName, lastName}, errorCallback) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                const displayName = firstName + ' ' + lastName;
                const newUser = {
                    email,
                    firstName,
                    lastName,
                    displayName: firstName + ' ' + lastName,
                    uid: user.uid
                };

                updateUserData(newUser);

                user.updateProfile({
                    displayName
                });

                resolve(user);
            })
            .catch(function(error) {
                reject(error);
            });
    })
}

const addTeamGoal = (teamGoal, uid) => {
    const newActionItemKey = database.rootRef().child('action-items').push().key;

    let updates = {};
    updates[`/action-items/${newActionItemKey}`] = teamGoal;
    updates[`/user-action-items/${uid}/${newActionItemKey}`] = teamGoal;

    return database.rootRef().update(updates);
}

export {
    createUser,
    addTeamGoal
}