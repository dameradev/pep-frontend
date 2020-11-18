import gql from 'graphql-tag';

export const LOCAL_STATE_QUERY = gql`
  query {
    user @client
  }
`;

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

export const SINGLE_ORGANIZATION_QUERY = gql`
  query SINGLE_ORGANIZATION_QUERY($id: Int) {
    organization(id: $id) {
      id
      name
      email
      organizationProfile {
        responsiblePerson
        website
        phoneNumber
        slogan
        summary
        focusedOn
      }
    }
  }
`;

export const PROJECTS_BY_ORGANIZATION = gql`
  query projectsByOrganization($organizationId: Int) {
    projectsByOrganization(organizationId: $organizationId) {
      id
      title
      totalNumberOfParticipants
      projectType
      activity
      startDate
      endDate
      savedProjectUserIds
      nations {
        name
        numberOfParticipants
      }
      location {
        address
      }
    }
  }
`;
