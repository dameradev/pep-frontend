import gql from 'graphql-tag';
export const GET_ALL_COUNTRIES_QUERY = gql`
  query GET_ALL_COUNTRIES_QUERY {
    countries {
      name
      image
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query me($token: String) {
    me(token: $token) {
      id
      email
      name
      permissions
    }
  }
`;
