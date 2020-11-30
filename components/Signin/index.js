import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Mutation } from 'react-apollo';

import Form from '../styles/Form';
import Center from '../styles/Center';
import ErrorMessage from '../styles/ErrorMessage';

import { CURRENT_USER_QUERY } from '../../lib/queries';
import { SIGNIN_MUTATION } from '../../lib/mutations';
import useForm from '../../lib/useForm';

const Signin = () => {
  const { values: { email, password } = {}, values, updateValue } = useForm({
    email: '',

    password: '',
  });

  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={{ email, password }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signin, { error, loading }) => (
        <Form
          method="post"
          onSubmit={async (e) => {
            e.preventDefault();
            const { data } = await signin();
            localStorage.setItem('token', data.signin.token);

            Router.push('/');

            // this.setState({ email: '', password: '' });
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
              onChange={updateValue}
            />
          </label>

          <label htmlFor="password">
            <input
              name="password"
              type="password"
              id="password"
              value={password}
              placeholder="Please enter your password"
              onChange={updateValue}
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

          <button type="submit">Log in</button>
        </Form>
      )}
    </Mutation>
  );
};

export default Signin;
