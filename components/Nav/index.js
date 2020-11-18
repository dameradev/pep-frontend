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
import { useContext } from 'react';
import UserContext from '../../lib/auth';
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

const Nav = (props) => {
  const user = useContext(UserContext);
  return (
    <Navigation className={`${props.className}`}>
      <MenuLink href="/">Home</MenuLink>
      <MenuLink href="/projects">Projects</MenuLink>
      {user && (
        <>
          <MenuLink href="/create-project">Create a project</MenuLink>

          <MenuLink
            href={{
              pathname: `${
                user.permissions.includes('ORGANIZATION') ? '/organization' : 'participant'
              }`,
              query: { id: user.id, edit: false },
            }}
          >
            Profile
          </MenuLink>

          {user.permissions.includes('ADMIN') && <MenuLink href="/dashboard">Dashboard</MenuLink>}
          <Singout />
        </>
      )}

      {!user && <MenuLink href={{ pathname: '/auth', query: { path: 'login' } }}>Sign in</MenuLink>}
    </Navigation>
  );
};

export default Nav;
