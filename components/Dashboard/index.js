import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { TextField, Button, Checkbox } from '@material-ui/core';

import Error from '../styles/ErrorMessage';

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

const CREATE_COUNTRY_MUTATION = gql`
  mutation CREATE_COUNTRY_MUTATION($name: String!, $image: String) {
    createCountry(name: $name, image: $image) {
      id
      name
      image
    }
  }
`;

const DashboardStyled = styled.div`
  display: grid;

  grid-template-columns:
    [full-start]
    minmax(6rem, 1fr) [center-start]repeat(8, [col-start] minmax(min-content, 18rem) [col-end])
    [center-end] minmax(6rem, 1fr) [full-end];
  grid-gap: 2rem;
  align-items: start;

  .dashboard {
    &__organizations {
      grid-column: col-start 7 / center-end;

      &__title {
        padding: 1.5rem;
        font-weight: 400;
        border-bottom: 1px solid ${(props) => props.theme.borderColorPrimary};
      }
    }

    &__country-form {
      padding: 2rem;
      background: #fff;
      grid-column: center-start / col-end 1;

      grid-row: 1 / 2;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
      grid-gap: 3rem;

      .image {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

const OrganizationList = styled.ul`
  margin: 0;
  height: 80vh;
  overflow-y: scroll;
  /* border: 1px solid ${(props) => props.theme.borderColorPrimary}; */
  background: #fff;

  /* padding: 1.5rem; */
  .organization {
    &__item {
      margin-bottom: 1rem;
      padding: 1.5rem;

      display: flex;
      flex-direction: column;

      &:first-of-type {
      }

      &:nth-child(odd) {
        background: #e8e8e8;
        /* ${(props) => props.theme.lightGrey1} */
      }

      & > li {
        display: flex;
        ul {
          display: flex;
          /* width: 100%; */
          justify-content: space-between;
          /* background: blue; */
          li {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
            grid-gap: 1rem;
            align-items: start;
            justify-items: start;

            /* padding: 2rem; */
            label {
              display: flex;
              align-items: center;

              p {
                line-height: 1rem;
                text-transform: capitalize;
              }
            }
          }
        }
      }
    }
    &__header {
      display: flex;
      flex-direction: column;
      line-height: 2.5rem;
      h3 {
        font-weight: 400;
        padding-bottom: 1rem;
        color: ${(props) => props.theme.darkGrey1};
      }
    }
  }
`;

const permissionsList = ['ADMIN', 'USER', 'ORGANIZATION'];

class Dashboard extends Component {
  state = { countryName: '', image: '' };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadFile = async (e) => {
    // console.log('uploading file');
    const files = e.target.files;
    console.log(files);
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');
    const response = await fetch('https://api.cloudinary.com/v1_1/tlent/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await response.json();
    // console.log(file);
    this.setState({
      image: file.secure_url,
    });
  };

  render() {
    const { countryName: name, image } = this.state;
    return (
      <DashboardStyled>
        <Query query={ALL_ORGANIZATIONS_QUERY}>
          {({ data: { organizations } = {}, loading, error }) => {
            return organizations ? (
              <OrganizationList className="dashboard__organizations">
                <h2 className="dashboard__organizations__title">List of organizations</h2>
                {organizations.map((organization) => (
                  <UserPermission user={organization} key={organization.id} />
                ))}
              </OrganizationList>
            ) : (
              'Loading..'
            );
          }}
        </Query>
        <Mutation mutation={CREATE_COUNTRY_MUTATION} variables={{ name, image }}>
          {(createCountry, { loading, error }) => (
            <form
              className="dashboard__country-form"
              onSubmit={async (e) => {
                e.preventDefault();
                await createCountry();
                // Router.push('/');
                this.setState({ countryName: '', image: '' });
              }}
            >
              <h2>Add new country</h2>
              {loading && <p>Loading...</p>}
              <TextField
                className="form__input"
                type="text"
                onChange={this.handleChange}
                value={name}
                name="countryName"
                id="standard-basic"
                label="Name of country"
                variant="standard"
              />

              <label htmlFor="file" className="image">
                <span>Image</span>
                <input
                  type="file"
                  name="file"
                  id="file"
                  placeholder="Upload an image"
                  required
                  //value={this.state.image}
                  onChange={this.uploadFile}
                />
                {this.state.image && <img src={this.state.image} alt="Upload image" width="200" />}
              </label>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </form>
          )}
        </Mutation>
      </DashboardStyled>
    );
  }
}

class UserPermission extends Component {
  state = {
    permissions: this.props.user.permissions,
  };

  handleUpdatePermission = (e, updatePermissions) => {
    const checkbox = e.target;
    // take a copy of the current permissions
    let updatedPermissions = [...this.state.permissions];
    // figure out if we need to remove or add this permission
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter((permission) => permission != checkbox.value);
    }
    this.setState({ permissions: updatedPermissions }, () => updatePermissions());
  };

  render() {
    const { user } = this.props;
    const { permissions } = this.state;
    return (
      <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{ userId: user.id, permissions }}>
        {(updatedPermissions, { loading, error }) => (
          <li className="organization__item">
            {loading && <p>Loading...</p>}
            {error && <Error error={error} />}
            <li className="organization__header">
              <h3>{user.name}</h3>
              {/* <p>{user.email}</p> */}
            </li>
            <li>
              <ul>
                {permissionsList.map((permission) => (
                  <li>
                    <label>
                      <Checkbox
                        type="checkbox"
                        checked={permissions.includes(permission)}
                        value={permission}
                        onChange={(e) => this.handleUpdatePermission(e, updatedPermissions)}
                      />
                      <p>{permission}</p>
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          </li>
        )}
      </Mutation>
    );
  }
}

export default Dashboard;
