import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, productionEndpoint } from '../config';

function createClient({ headers }) {
  headers.append('Access-Control-Allow-Origin', 'https://pep-eu.herokuapp.com');
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : productionEndpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
