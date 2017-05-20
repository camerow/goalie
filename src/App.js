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
  auth,
  database
} from "./utils/firebase-utils";
import config from './rebass-config';

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
      <TeamActionsContainer signOut={this.signOut.bind(this)} user={this.state.user} />
    );

    const Login = (
      <RContainer>
        <Input value={this.state.email}   
          label="Email"
          name="email"
          onChange={this.handleAuthInput.bind(this)} />
        <Input 
          value={this.state.password}
          type="password" 
          label="Password"
          name="password"
          onChange={this.handleAuthInput.bind(this)} />
        <Button backgroundColor="secondary" 
          onClick={this.handleAuth.bind(this)}>
          Login
        </Button>
        
        <Input 
          label="First Name"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleAuthInput.bind(this)} />
        <Input 
          label="Last Name"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleAuthInput.bind(this)} />
        <Button backgroundColor="secondary" 
          onClick={this.createUser.bind(this)}>
          Register
        </Button>
        { this.state.error ? this.state.error : null }
      </RContainer>
    );

    if (this.state.haveCheckedAuth) {

      return (
        this.state.haveAuth ?
        TeamActions
        :
        Login
      );
    } else {
      return null;
    }
  }
}

App.childContextTypes = {
  rebass: React.PropTypes.object
}

export default App;
