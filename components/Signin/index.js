import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from '../styles/Form';
import ButtonStyled from '../styles/ButtonStyled';
import Center from '../styles/Center';

import ErrorMessage from '../ErrorMessage';
import { CURRENT_USER_QUERY } from '../User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      age
      email
    }
  }
`;

class Signin extends Component {
  state = { email: '', password: '' };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => (
          <Center>
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await signin();
                Router.push('/');
                this.setState({ email: '', password: '' });
              }}
            >
              <h2>Login to an exising account</h2>
              <fieldset disabled={loading} aria-busy={loading}></fieldset>
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
              <div className="links-container">
                <Link href={{ pathname: '/auth', query: { path: 'register' } }}>
                  <a>Don't have an account?</a>
                </Link>

                <Link href={{ pathname: '/auth', query: { path: 'reset' } }}>
                  <a>Forgot password?</a>
                </Link>
              </div>

              <button type="submit">Sign Up</button>
            </Form>
          </Center>
        )}
      </Mutation>
    );
  }
}

export default Signin;
