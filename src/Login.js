import React, {Component} from 'react';
import {
  Button,
  Container as RContainer,
  Input
} from 'rebass';

// TODO: add MS Active Directory support
const Login = ({
    email,
    password,
    firstName,
    lastName,
    error,
    onInputChange,
    authenticate,
    createUser
}) => {
    return (
        <RContainer>
            <Input value={email}
                    label="Email"
                    name="email"
                    onChange={onInputChange} />
            <Input value={password}
                    type="password"
                    label="Password"
                    name="password"
                    onChange={onInputChange} />

            <Button backgroundColor="secondary"
                    onClick={() => authenticate('password')}>
                Login
            </Button>
            <Button backgroundColor="secondary"
                    onClick={() => authenticate('microsoftAD')}>
                Login with Microsoft
            </Button>
            <Input label="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={onInputChange} />
            <Input label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={onInputChange} />
            <Button backgroundColor="secondary"
                    onClick={createUser}>
                Register
            </Button>
            { error ? error : null }
        </RContainer>
    );
}

export default Login;