import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import User from '../User';
import Singout from '../Signout';
import { DropDown, DropDownItem } from '../styles/DropDown';
import gql from 'graphql-tag';

import { SAVE_USER_MUTATION } from '../../utils/mutations';

import { respondTo } from '../../utils/respondTo';
import MenuLink from './MenuLink';
import { useMutation } from 'react-apollo';
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
  a.active {
    color: ${(props) => props.theme.red};
  }
`;

class Nav extends Component {
  render() {
    return (
      <User>
        {({ data: { me } = {}, data }) => {
          return (
            <Navigation className={`${this.props.className}`}>
              <MenuLink href="/">Home</MenuLink>
              <MenuLink href="/projects">Projects</MenuLink>
              {me && (
                <>
                  <MenuLink href="/create-project">Create a project</MenuLink>

                  <MenuLink
                    href={{
                      pathname: `${
                        me.permissions.includes('ORGANIZATION') ? '/organization' : 'participant'
                      }`,
                      query: { id: me.id, edit: false },
                    }}
                  >
                    Profile
                  </MenuLink>

                  {me.permissions.includes('ADMIN') && (
                    <MenuLink href="/dashboard">Dashboard</MenuLink>
                  )}
                  <Singout />
                </>
              )}

              {!me && (
                <MenuLink href={{ pathname: '/auth', query: { path: 'login' } }}>Sign in</MenuLink>
              )}
            </Navigation>
          );
        }}
      </User>
    );
  }
}

export default Nav;
