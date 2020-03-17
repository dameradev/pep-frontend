import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import User from '../User';
import Singout from '../Signout';

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  a {
    padding-left: 2rem;
    font-size: 1.5rem;
    color: white;
  }
`;

class Nav extends Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <Navigation>
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/projects">
                <a>Projects</a>
              </Link>
              {me && (
                <>
                  <Link href="/organization">
                    <a>Create a project</a>
                  </Link>
                  <Singout />
                </>
              )}
              {!me && (
                <Link href={{ pathname: '/auth', query: { path: 'login' } }}>
                  <a>Sign in</a>
                </Link>
              )}
            </Navigation>
          );
        }}
      </User>
    );
  }
}

export default Nav;
