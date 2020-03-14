import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from '../styles/Form';
import ButtonStyled from '../styles/ButtonStyled';
import Center from '../styles/Center';

import ErrorMessage from '../ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $age: Int!, $password: String) {
    signup(email: $email, name: $name, age: $age, password: $password) {
      id
      name
      age
      email
    }
  }
`;

class Signup extends Component {
  state = { email: '', name: '', age: '', password: '' };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = date => {
    this.setState({ age: date });
  };

  render() {
    const { email, password, name, age } = this.state;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <Center>
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signup();
                this.setState({ email: '', name: '', password: '', age: '' });
              }}
            >
              <h2>Register for an account</h2>
              <fieldset disabled={loading} aria-busy={loading}>
                <ErrorMessage error={error} />

                <label htmlFor="email">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Please enter your email"
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="name">
                  <input
                    name="name"
                    type="name"
                    id="name"
                    value={name}
                    placeholder="Please enter your name"
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="password">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Please enter your password"
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="age">
                  {/* <DatePickerInput name="age" value={age} onChange={this.handleDateChange} /> */}

                  <input
                    name="age"
                    type="number"
                    id="age"
                    value={age}
                    placeholder="Please enter your age"
                    onChange={this.handleChange}
                  ></input>
                </label>
                <ButtonStyled type="submit">Sign Up</ButtonStyled>
              </fieldset>
            </Form>
          </Center>
        )}
      </Mutation>
    );
  }
}

export default Signup;
