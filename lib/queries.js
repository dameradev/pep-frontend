import gql from 'graphql-tag';

/* ==============RANDOM QUERIES============== */

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

/* ==============RANDOM QUERIES============== */

/* ==============USER QUERIES============== */

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

/* ==============USER QUERIES============== */

/* ==============PROJECT QUERIES============== */

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

export const SEARCH_PROJECTS_QUERY = gql`
  query SEARCH_PROJECTS_QUERY($nation: String, $projectType: String) {
    searchProjects(nation: $nation, projectType: $projectType) {
      id
      title
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
        lat
        lng
      }
    }
  }
`;

export const SINGLE_PROJECT_QUERY = gql`
  query SINGLE_PROJECT_QUERY($id: Int!) {
    project(id: $id) {
      id
      title
      description
      costs
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
      user {
        name
        email
        organizationProfile {
          slogan
          phoneNumber
          responsiblePerson
        }
      }
      applicants {
        motivation
        reason
        afterProject
        foodPreference
        status
        applicant {
          name
          age
          nationality
        }
      }
      # participants {
      #   name
      # }
    }
  }
`;

/* ==============PROJECT QUERIES============== */
