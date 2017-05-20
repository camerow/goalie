import React, { Component } from 'react';
import AddTeamAction from './Components/AddTeamAction';
import TeamActionsList from './Components/TeamActionsList';
import {
  Button,
  Container as RContainer,
  Input
} from 'rebass';
import {
  Container
} from 'react-grid-system';
import base from './utils/base';
import {
  firebaseUtils, 
  auth,
  database
} from "./utils/firebase-utils";

class TeamActionsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamActions: []
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
            goal: newItem.goal,
            name: newItem.name
        };

        const newActionItemKey = database.ref().child('action-items').push().key;

        let updates = {};
        updates[`/action-items/${newActionItemKey}`] = item;
        updates[`/user-action-items/${uid}/${newActionItemKey}`] = item;

        return database.ref().update(updates);
    }

    render() {
        return (
            <div className="">
                <Button style={{float: 'right'}} onClick={this.props.signOut}> Signout </Button>
                
                <Container>
                    <AddTeamAction addItem={this.addItem.bind(this)} />
                </Container>

                <TeamActionsList onDeleteTeamAction={this.deleteTeamAction.bind(this)} teamActions={this.state.teamActions} />
            </div>
        );
    }
}

export default TeamActionsContainer;