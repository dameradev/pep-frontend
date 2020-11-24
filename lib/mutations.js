import gql from 'graphql-tag';

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        name
        age
        id
        email
      }
      token
    }
  }
`;

export const SAVE_USER_MUTATION = gql`
  mutation saveUser($id: Int) {
    saveUser(id: $id) @client
  }
`;

export const UPDATE_ORGANIZATION = gql`
  mutation updateOrganization(
    $id: Int
    $name: String
    $slogan: String
    $summary: String
    $responsiblePerson: String
    $phoneNumber: String
    $website: String
    $focusedOn: [String]
    $interestedIn: [String]
  ) {
    updateOrganization(
      id: $id
      name: $name
      slogan: $slogan
      summary: $summary
      responsiblePerson: $responsiblePerson
      phoneNumber: $phoneNumber
      website: $website
      focusedOn: $focusedOn
      interestedIn: $interestedIn
    ) {
      organizationProfile {
        id
        summary
      }
    }
  }
`;

export const CHANGE_APPLICANT_STATUS_MUTATION = gql`
  mutation CHANGE_APPLICANT_STATUS_MUTATION(
    $userId: Int!
    $projectId: Int!
    $applicantId: Int!
    $status: String
  ) {
    changeApplicantStatus(
      userId: $userId
      projectId: $projectId
      applicantId: $applicantId
      status: $status
    ) {
      status
      id
    }
  }
`;

export const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATION(
    $title: String
    $description: String
    $costs: String
    $totalNumberOfParticipants: Int
    $projectType: ProjectType
    $activity: specificActivity
    $nations: [NationCreateWithoutProjectInput!]! # $objectives: [String!]! # $date: Date
    $startDate: DateTime
    $endDate: DateTime
    $address: String
    $country: String
  ) {
    createProject(
      title: $title
      description: $description
      costs: $costs
      totalNumberOfParticipants: $totalNumberOfParticipants
      projectType: $projectType
      activity: $activity
      nations: $nations
      startDate: $startDate
      endDate: $endDate
      address: $address
      country: $country
    ) {
      id
    }
  }
`;

export const SAVE_PROJECT_MUTATION = gql`
  mutation SAVE_PROJECT_MUTATION($projectId: Int) {
    saveProject(projectId: $projectId) {
      isSaved
    }
  }
`;

export const APPLY_FOR_PROJECT_MUTATION = gql`
  mutation APPLY_FOR_PROJECT_MUTATION(
    $motivation: String!
    $reason: String!
    $afterProject: String!
    $foodPreference: [FoodPreference]!
    $projectId: ID!
  ) {
    applyForProject(
      motivation: $motivation
      reason: $reason
      afterProject: $afterProject
      foodPreference: $foodPreference
      projectId: $projectId
    ) {
      id
    }
  }
`;
