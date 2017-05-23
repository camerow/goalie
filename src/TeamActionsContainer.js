import React, { Component } from 'react';
import AddTeamAction from './Components/AddTeamAction';
import TeamActionsList from './Components/TeamActionsList';
import {
  Button
} from 'rebass';
import {
  Container
} from 'react-grid-system';
import base from './utils/base';
import {
  database
} from "./utils/firebase-refs";

class TeamActionsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamActions: [],
            teamActionsFilter: '',
            actionItemMenusOpen: {}
        }
    }

    componentWillMount() {
        base.bindToState(`action-items`, {
            context: this,
            state: 'teamActions',
            asArray: true
        });
    }

    deleteTeamAction({key, uid, ...rest}) {
        let updates = {};
        updates[`/action-items/${key}`] = null;
        updates[`/user-action-items/${uid}/${key}`] = null;

        return database.ref().update(updates);
    }

    addItem(newItem) {
        const { user: {
            email,
            displayName,
            uid
        }} = this.props;

        const item = {
            userEmail: email,
            displayName,
            uid,
            dateAdded: new Date(),
            rating: 0,
            goal: newItem.goal,
            name: newItem.name
        };

        const newActionItemKey = database.ref().child('action-items').push().key;

        let updates = {};
        updates[`/action-items/${newActionItemKey}`] = item;
        updates[`/user-action-items/${uid}/${newActionItemKey}`] = item;

        return database.ref().update(updates);
    }

    updateRating({key}, rating) {
        database.ref().child('action-items/' + key).update({
            rating
        });
    }

    openActionItemMenu(index) {
        console.log(this.state.actionItemMenusOpen);
        this.setState({
            actionItemMenusOpen: Object.assign({}, this.state.actionItemMenusOpen, {
                [index]: !this.state.actionItemMenusOpen[index]
            })
        })
    }

    render() {
        return (
            <div>
                <AddTeamAction addItem={this.addItem.bind(this)} />

                <TeamActionsList
                    menusOpen={this.state.actionItemMenusOpen}
                    openMenu={this.openActionItemMenu.bind(this)}
                    updateRating={this.updateRating.bind(this)}
                    onDeleteTeamAction={this.deleteTeamAction.bind(this)}
                    teamActions={this.state.teamActions} />
            </div>
        );
    }
}

export default TeamActionsContainer;