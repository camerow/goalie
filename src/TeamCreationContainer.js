import React, { Component } from 'react';
import {
  Container as RContainer,
  Input,
  Heading,
  Dropdown,
  DropdownMenu,
  Button,
  Arrow,
  NavItem
} from 'rebass';
import base from './utils/base.js';
import {
    database,
    auth
} from './utils/firebase-utils';

class TeamCreationContainer extends Component {
    constructor() {
        super();
        this.state = {
            teams: [],
            teamMenuOpen: false
        };
    }

    componentDidMount() {
        database.ref().child('teams').once('value').then((snapshot) => {
            console.log('====================================');
            console.log(snapshot.val());
            console.log('====================================');
            this.setState({
                teams: snapshot.val()
            });
        });
    }

    addUserToTeam(teamKey) {
        const dbRef = database.ref();        
        const { uid } = auth.currentUser;

        let updates = {};
        updates[`/teams/${teamKey}`] = {
            members: {
                [uid]: true
            }
        };
        updates[`/users/${uid}/teams`] = {
            [teamKey]: true
        };

        dbRef.update(updates);
        this.props.setUserTeam(teamKey);
    }

    createTeam() {
        const dbRef = database.ref();
        const teamKey = dbRef.child('teams').push().key;
        const { uid } = auth.currentUser;

        let updates = {};
        updates[`/teams/${teamKey}`] = {
            name: 'pt1',
            members: {
                [uid]: true
            }
        };
        updates[`/users/${uid}/teams`] = {
            [teamKey]: true
        };
        console.log(updates);

        dbRef.update(updates);
    }

    render() {
        Object.keys(this.state.teams).forEach((team) => {
            console.log(this.state.teams[team], team);
        });
        return (
            <RContainer>
                <Heading style={{ paddingTop: '32px'}} level={2}>
                    Create Team:
                </Heading>
                <Input name="teamName" label="Team Name" />
                <Input name="teamPassword" label="Team Password" />
                <Button onClick={this.createTeam.bind(this)}>Create Team</Button>

                <Heading style={{ paddingTop: '32px'}} level={2}>
                    Join Existing Team:
                </Heading>

                <Dropdown onClick={ () => this.setState({ 
                        teamMenuOpen: !this.state.teamMenuOpen
                    })}>
                    <Button
                        backgroundColor="primary"
                        color="white"
                        inverted
                        rounded
                    >
                        Dropdown 
                        <Arrow direction="down" />
                    </Button>
                    <DropdownMenu open={this.state.teamMenuOpen}>
                        {
                            Object.keys(this.state.teams).map((team, i) => {
                                return (
                                    <NavItem onClick={() => this.addUserToTeam(team)} is="a" key={i}>
                                        {this.state.teams[team].name}
                                    </NavItem>
                                );
                            })
                        }
                    </DropdownMenu>
                </Dropdown>
                <ul>
                </ul>
            </RContainer>
        );
    }
}

export default TeamCreationContainer;