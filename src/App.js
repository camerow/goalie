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
      firebaseUtils.createUser({
        email,
        password,
        firstName,
        lastName
      }, (err, res) => {
        if ( !err ) {
          this.setState({ error: err });
        }
        else {
          this.setCurrentUser();
        }
      });
    } else {
      this.setState({
        error: 'You must provide a first and last name, email and password to register.'
      })
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
  }
}

App.childContextTypes = {
  rebass: React.PropTypes.object
}

export default App;
