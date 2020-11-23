import React from 'react';
import { Mutation, Query } from 'react-apollo';

import { ACTIVATE_ACCOUNT_QUERY } from '../lib/queries';

import ErrorMessage from '../components/styles/ErrorMessage';

const Active = ({ query: { token } = {} }) => {
  return (
    <Query query={ACTIVATE_ACCOUNT_QUERY} variables={{ token }}>
      {({ data, loading, error }) =>
        !error ? (
          <h1>{data?.activateAccount?.message}</h1>
        ) : (
          <h1>{error.message.replace('GraphQL error: ', '')}</h1>
        )
      }
    </Query>
  );
};

export default Active;
