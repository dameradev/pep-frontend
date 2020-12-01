import gql from 'graphql-tag';

/* ==============RANDOM QUERIES============== */

export const LOCAL_STATE_QUERY = gql`
  query {
    searchData @client {
      projectType
      activity
      nationality
      destination
    }
    popup {
      isPopupOpen
      title
      messages
      button
    }
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

export const GET_ALL_TAGS_QUERY = gql`
  query {
    tags {
      name
      type
      approved
    }
  }
`;

/* ==============RANDOM QUERIES============== */

/* ==============USER QUERIES============== */

export const ACTIVATE_ACCOUNT_QUERY = gql`
  query activateAccount($token: String) {
    activateAccount(token: $token) {
      message
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
        interestedIn
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
      address
      savedProjectUserIds
      nations {
        name
        numberOfParticipants
      }
    }
  }
`;

export const SEARCH_PROJECTS_QUERY = gql`
  query SEARCH_PROJECTS_QUERY(
    $projectType: String
    $activity: String
    $nationality: String
    $destination: String
    $skip: Int
    $take: Int
  ) {
    searchProjects(
      projectType: $projectType
      activity: $activity
      nationality: $nationality
      destination: $destination
      skip: $skip
      take: $take
    ) {
      projects {
        id
        title
        projectType
        activity
        startDate
        endDate
        address
        savedProjectUserIds
        nations {
          name
          numberOfParticipants
        }
      }
      totalCount
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
      address
      savedProjectUserIds
      nations {
        name
        numberOfParticipants
      }

      user {
        id
        name
        email
        organizationProfile {
          slogan
          phoneNumber
          responsiblePerson
        }
      }

      applicantForm {
        id
        questions
      }
      applicants {
        id
        answers

        # motivation
        # reason
        # afterProject
        foodPreference
        status

        applicant {
          id
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
