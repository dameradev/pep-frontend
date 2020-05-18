import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../User';
import styled from 'styled-components';

const SIGNOUT_MUTATION = gql`
  mutation {
    signout {
      message
    }
  }
`;

const SignoutButton = styled.button`
  margin-left: 2rem;
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 1rem 1.5rem;
  background-color: #303030;
  cursor: pointer;
`;

const Signout = (props) => (
  <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {(signout) => <SignoutButton onClick={signout}>Sing out</SignoutButton>}
  </Mutation>
);

export default Signout;
