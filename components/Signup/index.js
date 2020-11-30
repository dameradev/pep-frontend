import React, { Component } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Form from '../styles/Form';
import ButtonStyled from '../styles/ButtonStyled';
import Center from '../styles/Center';

import ErrorMessage from '../styles/ErrorMessage';
import useForm from '../../lib/useForm';
import { useEffect } from 'react';

const GET_ALL_COUNTRIES_QUERY = gql`
  query GET_ALL_COUNTRIES_QUERY {
    countries {
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

const Signup = (props) => {
  const {
    values: { email, name, age, password, type, nationality } = {},
    values,
    updateValue,
    updateValueManually,
  } = useForm({
    email: '',
    name: '',
    age: 0,
    password: '',
    type: '',
    nationality: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (!type && router.query.user) updateValueManually('type', router.query.user);
  });

  return (
    <Mutation mutation={SIGNUP_MUTATION} variables={values}>
      {(signup, { error, loading }) => (
        <Form
          method="post"
          onSubmit={async (e) => {
            e.preventDefault();
            await signup();
            Router.push('/successful-registration');
            // this.setState({ email: '', name: '', password: '', age: '' });
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
              onChange={updateValue}
            />
          </label>
          <label htmlFor="name">
            <input
              name="name"
              type="name"
              id="name"
              value={name}
              placeholder="Please enter your name"
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
          <label htmlFor="type">
            {/* <DatePickerInput name="type" value={type} onChange={this.handleDateChange} /> */}

            <select
              name="type"
              type="number"
              id="type"
              value={type}
              placeholder="Please enter your type"
              onChange={updateValue}
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
                onChange={updateValue}
              ></input>
            </label>
          )}

          <label htmlFor="nationality">
            <select
              name="nationality"
              id="nationality"
              value={nationality}
              placeholder="Please select your nationality"
              onChange={updateValue}
            >
              <Query query={GET_ALL_COUNTRIES_QUERY}>
                {({ data: { countries } = {}, data, error, loading }) => {
                  console.log(data);
                  return countries
                    ? countries.map((country) => (
                        <option value={country.name} label={country.name} />
                      ))
                    : 'Loading';
                }}
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
      )}
    </Mutation>
  );
};

export default Signup;
