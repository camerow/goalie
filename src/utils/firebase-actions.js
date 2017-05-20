import {
    database
} from './firebase-utils';

const firebaseActions = {
    teamGoals: {
        addItem: function(newActionItem, uid) {
            const newActionItemKey = database.ref().child('action-items').push().key;

            let updates = {};
            updates[`/action-items/${newActionItemKey}`] = item;
            updates[`/user-action-items/${uid}/${newActionItemKey}`] = item;

            return database.ref().update(updates);
        }
    }
}
