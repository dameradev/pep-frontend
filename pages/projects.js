import { useState, useContext } from 'react';
import { adopt } from 'react-adopt';
import ProjectsList from '../components/Projects';

import { Query, useLazyQuery, useMutation, useQuery } from 'react-apollo';

import gql from 'graphql-tag';

import SearchPanel from '../components/SearchPanel';
import styled from 'styled-components';

import { projectTypes } from '../config';
import { GET_ALL_COUNTRIES_QUERY, SEARCH_PROJECTS_QUERY } from '../utils/queries';

import { respondTo } from '../utils/respondTo';
import UserContext from '../lib/auth';

const ProjectsPage = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 30rem 1fr;
  grid-column-gap: 3rem;
  padding: 0 5%;

  ${respondTo.tabletMini` 
    display: flex;
    flex-direction: column;
  `}
`;

const Composed = adopt({
  localState: ({ render }) => <Query query={GET_ALL_COUNTRIES_QUERY}>{render}</Query>,
});

const Projects = () => {
  const [projectType, setProjectType] = useState('ESC');
  const [nation, setNation] = useState('North Macedonia');

  const user = useContext(UserContext);

  const [searchProjects, { loading, error, data }] = useLazyQuery(SEARCH_PROJECTS_QUERY, {
    variables: {
      projectType,
      nation: nation,
    },
  });
  return (
    <ProjectsPage>
      <Composed>
        {({ localState }) => {
          const nations = localState.data?.countries;

          return (
            <>
              {!localState.loading && (
                <SearchPanel
                  projectTypes={projectTypes}
                  projectType={projectType}
                  setProjectType={setProjectType}
                  nations={nations}
                  nation={nation}
                  setNation={setNation}
                  submit={searchProjects}
                />
              )}
              <ProjectsList projects={data?.searchProjects} userId={user?.id} />
            </>
          );
        }}
      </Composed>
    </ProjectsPage>
  );
};

export default Projects;
