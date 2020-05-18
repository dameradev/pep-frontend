import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Form from '../styles/Form';
import ButtonStyled from '../styles/ButtonStyled';
import Center from '../styles/Center';

import ErrorMessage from '../ErrorMessage';

const GET_ALL_COUNTRIES_QUERY = gql`
  query GET_ALL_COUNTRIES_QUERY {
    getCountries {
      name
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $age: Int
    $password: String!
    $type: String!
    $nationality: String!
  ) {
    signup(
      email: $email
      name: $name
      age: $age
      password: $password
      type: $type
      nationality: $nationality
    ) {
      id
      name
      age
      email
      type
    }
  }
`;

const typeOfUser = [
  { label: 'Participant', value: 'participant' },
  { label: 'Organization', value: 'organization' },
];

class Signup extends Component {
  state = { email: '', name: '', age: 0, password: '', type: 'participant', nationality: '' };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ age: date });
  };

  render() {
    const { email, password, name, age, type, nationality } = this.state;

    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <Center>
            <Form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await signup();
                Router.push('/');
                this.setState({ email: '', name: '', password: '', age: '' });
              }}
            >
              <h2>Register for an account</h2>
              <fieldset disabled={loading} aria-busy={loading}></fieldset>
              <ErrorMessage error={error} />

              <label htmlFor="email">
                <input
                  name="email"
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Email Address"
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
              <label htmlFor="type">
                {/* <DatePickerInput name="type" value={type} onChange={this.handleDateChange} /> */}

                <select
                  name="type"
                  type="number"
                  id="type"
                  value={type}
                  placeholder="Please enter your type"
                  onChange={this.handleChange}
                >
                  {typeOfUser.map((user) => (
                    <option value={user.value} label={user.label} />
                  ))}
                </select>
              </label>
              {type === 'participant' && (
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
              )}

              <label htmlFor="nationality">
                <select
                  name="nationality"
                  id="nationality"
                  value={nationality}
                  placeholder="Please select your nationality"
                  onChange={this.handleChange}
                >
                  <Query query={GET_ALL_COUNTRIES_QUERY}>
                    {({ data: { getCountries }, error, loading }) =>
                      getCountries.map((country) => (
                        <option value={country.name} label={country.name} />
                      ))
                    }
                  </Query>
                </select>
              </label>
              <div className="links-container">
                <Link href={{ pathname: '/auth', query: { path: 'login' } }}>
                  <a>Already have an account?</a>
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

export default Signup;
