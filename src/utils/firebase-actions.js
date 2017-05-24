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
    });
};

// @TODO: user should be in a team before they can assign a goal to a team
//
const addTeamGoal = (teamGoal, uid) => {
    const newTeamGoalID = database.ref().child('action-items').push().key;

    let updates = {};
    updates[`/action-items/${newTeamGoalID}`] = teamGoal;
    updates[`/user-action-items/${uid}/${newTeamGoalID}`] = teamGoal;

    return database.ref().update(updates);
};

const deleteTeamGoal = (key, uid) => {
    let updates = {};
    updates[`/action-items/${key}`] = null;
    updates[`/user-action-items/${uid}/${key}`] = null;

    return database.ref().update(updates);
};

const updateGoalRating = (key, rating) => {
    database.ref().child('action-items/' + key).update({
        rating
    });
};

export {
    createUser,
    addTeamGoal,
    deleteTeamGoal,
    updateGoalRating
};