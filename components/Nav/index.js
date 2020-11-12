import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import User from '../User';
import Singout from '../Signout';
import { DropDown, DropDownItem } from '../styles/DropDown';

import { respondTo } from '../../utils/respondTo';
const Navigation = styled.nav`
  display: flex;
  align-items: center;
  a {
    padding-left: 2rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
  }
`;

class Nav extends Component {
  render() {
    return (
      <User>
        {({ data: { me } = {}, data }) => {
          return (
            <Navigation className={`${this.props.className}`}>
              <Link href="/">
                <a>Home</a>
              </Link>
              <Link href="/projects">
                <a>Projects</a>
              </Link>
              {me && (
                <>
                  <Link href="/create-project">
                    <a>Create a project</a>
                  </Link>

                  <Link
                    href={{
                      pathname: `${
                        me.permissions.includes('ORGANIZATION') ? '/organization' : 'participant'
                      }`,
                      query: { id: me.id, edit: false },
                    }}
                  >
                    <a>Profile</a>
                  </Link>

                  {me.permissions.includes('ADMIN') && (
                    <Link href="/dashboard">
                      <a>Dashboard</a>
                    </Link>
                  )}
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
