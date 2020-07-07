import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import SingleProject from './SingleProject';

// const ALL_PROJECTS_QUERY = gql`
//   query ALL_PROJECTS_QUERY {
//     projects {
//       id
//       title
//       projectType
//       costs
//       activity
//       nations {
//         name
//         numberOfParticipants
//       }
//       location {
//         address
//         lat
//         lng
//       }
//     }
//   }
// `;

const Center = styled.div`
  margin-top: 2rem;
  h1 {
    font-weight: 300;
  }
`;

const ProjectList = styled.div`
  font-size: 1.2rem;
`;

export default class Projects extends Component {
  render() {
    const { projects } = this.props;
    console.log(projects);
    return (
      <Center>
        <>
          <ProjectList>
            {!projects ? (
              <h1>Please enter search parameters on the search panel to get results</h1>
            ) : projects.length > 0 ? (
              projects.map((project) => <SingleProject key={project.id} project={project} />)
            ) : (
              <h1>No results for your parameters</h1>
            )}
          </ProjectList>
        </>

        {/* }}
        </Query> */}
      </Center>
    );
  }
}
// export { ALL_PROJECTS_QUERY };
