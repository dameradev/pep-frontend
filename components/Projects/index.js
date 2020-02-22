import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import SingleProject from "./SingleProject";


const ALL_PROJECTS_QUERY = gql`
  query ALL_PROJECTS_QUERY{
    projects {
      id
      title
      projectType,
      costs,
      activity
      nations {
        name
        numberOfParticipants
      },
      location {
        address
        lat
        lng
      }
    }
  }
`;

const Center = styled.div`
  text-align: center;
  .projects-title {
    font-style: italic;
  }
`;

const ProjectList = styled.div`
  font-size:1.2rem;
`;

export default class Projects extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_PROJECTS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            console.log(data.projects)
            return (
              <>
              <h1 className="projects-title">Below is a list of all the currently avaialable projects</h1>
              <ProjectList>
                {data && data.projects.map(project => (
                   <SingleProject key={project.id} project={project} />
                ))}
              </ProjectList>
              </>
            );
          }}
        </Query>
      </Center>
    );
  }
}
export { ALL_PROJECTS_QUERY };
