import React, { Component } from 'react';
import { Button } from 'rebass';
import { Container } from 'react-grid-system';

import base from './utils/base';
import { database } from "./utils/firebase-refs";
import {
    addTeamGoal,
    deleteTeamGoal,
    updateGoalRating
} from './utils/firebase-actions';
import AddTeamGoal from './Components/AddTeamGoal';
import TeamGoalList from './Components/TeamGoalList';

class TeamGoalsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamActions: [],
            teamActionsFilter: '',
            actionItemMenusOpen: {}
        };
    };

    componentWillMount() {
        base.bindToState(`action-items`, {
            context: this,
            state: 'teamActions',
            asArray: true
        });
    };

    deleteTeamAction({key, uid, ...rest}) {
        deleteTeamGoal(key, uid);
    };

    addItem(newItem) {
        const { user: {
            email,
            displayName,
            uid
        }} = this.props;

        const teamGoal = {
            userEmail: email,
            displayName,
            uid,
            dateAdded: new Date(),
            rating: 0,
            goal: newItem.goal,
            name: newItem.name
        };

        addTeamGoal(teamGoal, uid);
    };

    updateRating({key}, rating) {
        updateGoalRating(key, rating);
    };

    openActionItemMenu(index) {
        this.setState({
            actionItemMenusOpen: Object.assign({}, this.state.actionItemMenusOpen, {
                [index]: !this.state.actionItemMenusOpen[index]
            })
        });
    };

    render() {
        return (
            <div>
                <AddTeamGoal addItem={this.addItem.bind(this)} />

                <TeamGoalList
                    menusOpen={this.state.actionItemMenusOpen}
                    openMenu={this.openActionItemMenu.bind(this)}
                    updateRating={this.updateRating.bind(this)}
                    onDeleteTeamAction={this.deleteTeamAction.bind(this)}
                    teamActions={this.state.teamActions} />
            </div>
        );
    };
};

export default TeamGoalsContainer;