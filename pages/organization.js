import React, { useEffect } from 'react';
import { Query, Mutation, useLazyQuery } from 'react-apollo';
import Organization from '../components/Organization';
import gql from 'graphql-tag';

const SINGLE_ORGANIZATION_QUERY = gql`
  query SINGLE_ORGANIZATION_QUERY($id: ID) {
    organization(where: { id: $id }) {
      id
      name
      email
      responsiblePerson
      website
      phoneNumber
      slogan
      summary
      focusedOn
      projectsCreated {
        id
        title
        costs
        totalNumberOfParticipants
        projectType
        activity
        nations {
          name
          numberOfParticipants
        }
        location {
          address
        }
        description
        participants {
          id
          name
          email
        }
        applicants {
          id
          motivation
          status
          applicant {
            id
            name
            email
          }
        }
      }
    }
  }
`;

const OrganizationPage = (props) => {
  const [getOrganization, { loading, error, data }] = useLazyQuery(SINGLE_ORGANIZATION_QUERY);

  useEffect(() => {
    // console.log('inside');
    if (!data?.organization) {
      getOrganization();
      console.log(getOrganization);
    }
    console.log(data, 'data');
    console.log(loading, 'data');
    console.log(error, 'data');
    // else if (data) {
    //   console.log('useEffect');
    //   if (responsiblePerson === 0) {
    //     setResponsiblePerson(data?.organization.responsiblePerson);
    //   }

    //   if (!phoneNumber) {
    //     setPhoneNumber(data?.organization.phoneNumber);
    //   }

    //   if (!phoneNumber) {
    //     setWebsite(data?.organization.website);
    //   }
    // }
    // return () => {
    //   console.log('finish');
    // };
  }, []);

  return (
    // <ContentContainer>
    //   <LeftPanel>
    <Organization
      id={props.query.id}
      path={props.query.path}
      edit={props.query.edit}
      organization={data?.organization}
    />
    //   </LeftPanel>
    // </ContentContainer>
  );
};

export default OrganizationPage;
