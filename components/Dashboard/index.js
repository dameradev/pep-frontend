import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Error from "../ErrorMessage"

const ALL_ORGANIZATIONS_QUERY = gql`
  query {
    organizations {
      id
      name
      email
      permissions
      type
    }
  }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($userId: ID!, $permissions: [Permission]) {
    updatePermission(userId: $userId, permissions: $permissions) {
      id
      name
      permissions
      email
    }
  }
`;

const OrganizationList = styled.ul`
  div {
    display: flex;
    border: 1px solid #ccc;
    padding: 15px;
    flex-direction: column;
    margin: 2rem;
    box-shadow: 1px 14px 24px -16px rgba(0, 0, 0, 0.37);
    & > li {
      /* border: 1px solid blue; */
      display: flex;
      ul {
        display: flex;
        width: 100%;
        justify-content: space-between;
        /* background: blue; */
        li {
          padding: 2rem;
          label {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      }
    }
  }
`;

const permissionsList = ['ADMIN', 'USER', 'ORGANIZATION'];

const Dashboard = () => {
  return (
    <Query query={ALL_ORGANIZATIONS_QUERY}>
      {({ data: { organizations }, loading, error }) => {
        
        return (
          <OrganizationList>
            {organizations.map(organization => (
              <UserPermission user={organization} key={organization.id} />
            ))}
          </OrganizationList>
        );
      }}
    </Query>
  );
};

class UserPermission extends Component {
  state = {
    permissions: this.props.user.permissions
  };

  handleUpdatePermission = (e, updatePermissions) => {
    const checkbox = e.target;
    // take a copy of the current permissions
    let updatedPermissions = [...this.state.permissions];
    // figure out if we need to remove or add this permission
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission != checkbox.value);
    }
    this.setState({ permissions: updatedPermissions }, () => updatePermissions());
  };

  render() {
    const { user } = this.props;
    const { permissions } = this.state;
    return (
      <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{ userId: user.id, permissions }}>
        {(updatedPermissions, { loading, error }) => (
          <div>
            {loading && <p>Loading...</p>}
            {error && <Error error={error} />}
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>
              <ul>
                {permissionsList.map(permission => (
                  <li>
                    <label>
                      <p>{permission}</p>
                      <input
                        type="checkbox"
                        checked={permissions.includes(permission)}
                        value={permission}
                        onChange={e => this.handleUpdatePermission(e, updatedPermissions)}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Dashboard;
