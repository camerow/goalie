import React, {
  Component
} from 'react';
import {
  Button,
  Container as RContainer,
  Input
} from 'rebass';

import {
  firebaseUtils, 
  auth
} from "./utils/firebase-utils";
import config from './rebass-config';

import Login from './Login';
import TeamActionsContainer from './TeamActionsContainer';
import TeamCreationContainer from './TeamCreationContainer';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      haveAuth: false,
      haveCheckedAuth: false,
      user: {},
      email: '',
      password: '',
      userCurrentTeam: false
    }
  }

  getChildContext () {
    return {
      rebass: config
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (!this.state.haveCheckedAuth) {
        this.setState({
          haveCheckedAuth: true
        });
      }
      if (user) {
        this.setState({
          haveAuth: true,
          user: auth.currentUser
        });
      }
      else {
        this.setState({
          haveAuth: false
        });
      }
    });
  }

  handleAuth() {
    firebaseUtils.loginWithPW({ 
      email: this.state.email, 
      password: this.state.password 
    }, (err) => {
      if (err) {
        this.setState({ error: err });
      }
      else {
        this.setCurrentUser();
      }
    });
  }

  createUser() {
    const { 
      firstName, 
      lastName, 
      email, 
      password 
    } = this.state;
    
    if (firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0) {
      let newUser = {
        email,
        password,
        firstName,
        lastName
      };

      firebaseUtils.createUser(newUser, (err, res) => {
        if ( err ) {
          this.setState({ error: err });
        }
        else {
          this.setCurrentUser();
        }
      });
    } else {
      this.setState({
        error: 'You must provide a first and last name, email and password to register.'
      });
    }
  }

  setCurrentUser() {
    this.setState({
      user: auth.currentUser
    });
  }

  handleAuthInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  signOut() {
    firebaseUtils.logout();
  }

  setUserTeam(teamID) {
    this.setState({
      userCurrentTeam: teamID
    });
  }

  render() {
    const { haveAuth, haveCheckedAuth, userCurrentTeam, user } = this.state;

    if (haveCheckedAuth) {
      if (haveAuth) {
        if (userCurrentTeam) {
          return (
            <div>
              <Button style={{float: 'right'}} onClick={this.signOut.bind(this)}> 
                Signout 
              </Button>

              <TeamActionsContainer 
                currentGroup={userCurrentTeam}
                signOut={this.signOut.bind(this)} 
                user={user} />

            </div>
          );
        }
        else {
          return (
            <TeamCreationContainer setUserTeam={this.setUserTeam.bind(this)} />
          );
        }
      }      
      else {
        return (
          <Login 
            createUser={this.createUser.bind(this)} 
            authenticate={this.handleAuth.bind(this)} 
            onInputChange={this.handleAuthInput.bind(this)} />
        );
      }
    } 
    else {
      return null;
    }
  }
}

App.childContextTypes = {
  rebass: React.PropTypes.object
}

export default App;
