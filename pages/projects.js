import { useState } from 'react';

import ProjectsList from '../components/Projects';

import { Query, useLazyQuery, useQuery } from 'react-apollo';

// import { useQuery, useLazyQuery, query } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import SearchPanel from '../components/SearchPanel';
import styled from 'styled-components';

import { projectTypes } from '../config';
import { GET_ALL_COUNTRIES_QUERY } from '../utils/queries';

const SEARCH_PROJECTS_QUERY = gql`
  query SEARCH_PROJECTS_QUERY($nation: String, $projectType: String) {
    searchProjects(nation: $nation, projectType: $projectType) {
      id
      title
      projectType
      costs
      activity
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

const ProjectsPage = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: minmax(15rem, 30rem) 1fr;
  grid-column-gap: 3rem;
  padding: 0 15rem;
`;

const Projects = () => {
  const [projectType, setProjectType] = useState('ESC');
  const [nation, setNation] = useState();

  const [searchProjects, { loading, error, data }] = useLazyQuery(SEARCH_PROJECTS_QUERY, {
    variables: {
      projectType,
      nation: nation,
    },
  });

  return (
    <ProjectsPage>
      <Query query={GET_ALL_COUNTRIES_QUERY}>
        {({ data: nationsData }) => {
          return (
            <>
              <SearchPanel
                projectTypes={projectTypes}
                projectType={projectType}
                setProjectType={setProjectType}
                nations={nationsData?.countries}
                nation={nation}
                setNation={setNation}
                submit={searchProjects}
              />
              <ProjectsList projects={data && data.searchProjects} />
            </>
          );
        }}
      </Query>
    </ProjectsPage>
  );
};

export default Projects;
