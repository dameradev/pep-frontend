import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, productionEndpoint } from '../config';

function createClient({ headers }) {
  // headers.append();
  // const token = localStorage.getItem('token');
  // console.log(token, 'createCliet');
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : productionEndpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers: {
          ...headers,
          'Access-Control-Allow-Origin': 'https://pep-eu.herokuapp.com',
          token: `${localStorage.getItem('token')}`,
        },
      });
    },
  });
}

export default withApollo(createClient);
