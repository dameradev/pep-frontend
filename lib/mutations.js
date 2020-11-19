import gql from 'graphql-tag';

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
    ) {
      organizationProfile {
        id
        summary
      }
    }
  }
`;
