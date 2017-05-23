import React, {
  Component
} from 'react';
import {
  Button,
  Container as RContainer,
  Input
} from 'rebass';
import { auth } from './utils/firebase-refs';
import firebaseAuth from "./utils/firebase-auth";
import {
  createUser as createFirebaseUser
} from "./utils/firebase-actions";

import config from './rebass-config';
import Login from './Login';
import TeamActionsContainer from './TeamActionsContainer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      haveAuth: false,
      haveCheckedAuth: false,
      user: {},
      email: '',
      password: ''
    }
  };

  getChildContext () {
    return {
      rebass: config
    };
  };

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
  };

  handleAuth(provider) {
    switch (provider) {
      case 'password':
        firebaseAuth.loginWithPW({
          email: this.state.email,
          password: this.state.password
        })
        .then(response => {
          this.setCurrentUser();
        })
        .catch(error => {
          console.log(error);
          this.setState({
            error: error.message
          });
        });

        break;

      case 'microsoftAD':

        this.setState({
          error: 'Please specify an Auth provider.'
        });
        break;
      default:
        this.setState({
          error: 'Please specify an Auth provider.'
        });
        break;
    }
  };

  createUser() {
    const {
      firstName,
      lastName,
      email,
      password
    } = this.state;

    if (this.validateUserFields(this.state)) {
      createFirebaseUser({
        email,
        password,
        firstName,
        lastName
      })
      .then((user) => {
        this.setCurrentUser();
      })
      .catch((error) => {
        this.setState({
          error: error.message
        });
      });

    } else {
      this.setState({
        error: 'You must provide a first and last name, email and password to register.'
      })
    }
  };

  validateUserFields({firstName, lastName, email, password}) {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      password.length > 0
    );
  };

  setCurrentUser() {
    this.setState({
      user: auth.currentUser
    });
  };

  handleAuthInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  signOut() {
    firebaseAuth.logout();
  };

  render() {
    const TeamActions = (
      <TeamActionsContainer
        signOut={this.signOut.bind(this)}
        user={this.state.user} />
    );

    if (this.state.haveCheckedAuth) {
      return (
        <div>
          {
            this.state.haveAuth ?
            <div>
              <Button style={{float: 'right'}} onClick={this.signOut.bind(this)}>
                Signout
              </Button>

              {TeamActions}

            </div>
            :
            <Login
              error={this.state.error}
              createUser={this.createUser.bind(this)}
              authenticate={this.handleAuth.bind(this)}
              onInputChange={this.handleAuthInput.bind(this)} />
          }
        </div>
      );
    }
    else {
      return null;
    }
  };
};

App.childContextTypes = {
  rebass: React.PropTypes.object
};

export default App;
