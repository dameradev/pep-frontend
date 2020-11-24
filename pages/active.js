import React from 'react';
import { Mutation, Query } from 'react-apollo';

import { ACTIVATE_ACCOUNT_QUERY } from '../lib/queries';

import ErrorMessage from '../components/styles/ErrorMessage';
import styled from 'styled-components';
import { respondTo } from '../lib/respondTo';

const ActivePageStyles = styled.div`
  min-height: 60vh;
  padding: 5rem 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    max-width: 100rem;
    font-size: 2.8rem;
    text-align: center;
    font-weight: 400;
    ${respondTo.tabletMini`
      font-size: 2rem;
    `}
    ${respondTo.mobileSmall`
      font-size: 1.6rem;
    `}
  }
  img {
    padding-top: 2rem;
    max-width: 20rem;
  }

  button {
    margin-top: 5rem;
    outline: none;
    width: fit-content;

    padding: 1rem 2.5rem;
    border: 2px solid ${(props) => props.theme.blue};
    text-transform: uppercase;

    background: #fff;
    color: ${(props) => props.theme.blue};
    border-radius: 10px;

    transition: all 0.3s;

    &:hover {
      background: ${(props) => props.theme.blue};
      color: #fff;
    }

    &:active {
      transform: translateY(3px);
    }
  }
`;

const Active = ({ query: { token } = {} }) => {
  return (
    <ActivePageStyles>
      <Query query={ACTIVATE_ACCOUNT_QUERY} variables={{ token }}>
        {({ data, loading, error }) =>
          !error ? (
            <>
              <h1>{data?.activateAccount?.message}</h1>
              <img src="https://res.cloudinary.com/dvvbls283/image/upload/c_scale,w_340/v1606220171/tneo0nowr7ywaa1suhgy.jp2" />
              <button>Sign in now</button>
            </>
          ) : (
            <>
              <h1>{error.message.replace('GraphQL error: ', '')}</h1>
              <img src="https://res.cloudinary.com/dvvbls283/image/upload/c_scale,q_auto:low,w_390/v1606220171/tneo0nowr7ywaa1suhgy.webp" />
              <button>Sign in now</button>
            </>
          )
        }
      </Query>
    </ActivePageStyles>
  );
};

export default Active;
