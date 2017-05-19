import React, {
  Component
} from 'react';
import { 
  Heading,
  Button,
  Container as RContainer,
  Input
} from 'rebass';
import {
  Container
} from 'react-grid-system';
import AddTeamAction from './AddTeamAction';
import TeamActionsList from './TeamActionsList';
import base from './utils/base';
import {
  firebaseUtils, 
  auth,
  ref,
  database
} from "./utils/firebase-utils";
import config from './rebass-config';
import './App.css';

window.auth = auth;
class App extends Component {
  constructor() {
    super();
    this.state = {
      haveAuth: false,
      user: {},
      email: 'cameron.will@gmail.com',
      password: 'so.1itgoes',
      teamActions: [],
      teamMembers: ['Leigh', 'Will', 'Graham', 'Cody']
    }
  }

  getChildContext () {
    return {
      rebass: config
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
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

    base.syncState(`teamActions`, {
      context: this,
      state: 'teamActions',
      asArray: true
    });
  }

  addItem(newItem) {
    const { user: { email, displayName, uid }} = this.state;

    const item = { 
      userEmail: email,
      displayName,
      uid,
      dateAdded: new Date(),
      ...newItem
    };

    this.setState({
      teamActions: this.state.teamActions.concat([ item ])
    });

  }

  deleteTeamAction(index) {
    const {teamActions} = this.state;
    
    this.setState({
      teamActions: [
        ...teamActions.slice(0, index),
        ...teamActions.slice(index + 1)
      ]
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
    const { firstName, lastName, email, password } = this.state;
    
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

  signOut() {
    firebaseUtils.logout();
  }

  render() {
    const App = (
      <div className="">
        <Button style={{float: 'right'}} onClick={this.signOut.bind(this)}> Signout </Button>
          <Container>
            <AddTeamAction addItem={this.addItem.bind(this)} />
          </Container>
          <TeamActionsList onDeleteTeamAction={this.deleteTeamAction.bind(this)} teamActions={this.state.teamActions} />
      </div>
    );

    const Login = (
      <RContainer>
        <Input value={this.state.email}   
          label="Email"
          name="email"
          onChange={(event) => { this.setState({ email: event.target.value }) }} />
        <Input 
          value={this.state.password}
          type="password" 
          label="Password"
          name="password"
          onChange={(event) => { this.setState({ password: event.target.value }) }} />
        <Button backgroundColor="secondary" 
          onClick={this.handleAuth.bind(this)}>
          Login
        </Button>
        
        <Input 
          label="First Name"
          name="firstName"
          value={this.state.firstName}
          onChange={(event) => {this.setState({ firstName: event.target.value})}} />
        <Input 
          label="Last Name"
          name="lastName"
          value={this.state.lastName}
          onChange={(event) => {this.setState({ lastName: event.target.value})}} />
        <Button backgroundColor="secondary" 
          onClick={this.createUser.bind(this)}>
          Register
        </Button>
        { this.state.error ? this.state.error : null }
      </RContainer>
    );

    return (
      this.state.haveAuth ?
      App
      :
      Login

    );
  }
}

App.childContextTypes = {
  rebass: React.PropTypes.object
}

export default App;
