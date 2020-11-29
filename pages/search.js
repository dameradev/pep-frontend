import { useState, useContext } from 'react';
import ProjectsList from '../components/Projects';

import { useLazyQuery, useMutation, useQuery } from 'react-apollo';

import SearchPanel from '../components/SearchPanel';
import styled from 'styled-components';

import { SEARCH_PROJECTS_QUERY, LOCAL_STATE_QUERY } from '../lib/queries';
import { SAVE_SEARCH_DATA_MUTAITON } from '../lib/mutations';

import { respondTo } from '../lib/respondTo';
import useForm from '../lib/useForm';
import UserContext from '../contexts/userContext';
import { useEffect } from 'react';

const ProjectsPage = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 30rem 1fr;
  grid-column-gap: 3rem;
  padding: 0 5%;

  ${respondTo.tabletMini` 
    padding: 0;
    display: flex;
    flex-direction: column;
  `}
`;

const Projects = ({ query: { search } }) => {
  const { data: localData } = useQuery(LOCAL_STATE_QUERY);
  const {
    values: { projectType, activity, nationality, destination } = {},
    values,
    updateValue,
  } = useForm({
    ...localData.searchData,
  });

  useEffect(() => {
    if (search === 'true') {
      searchProjects();
    }
  }, {});

  // console.log(query);
  const user = useContext(UserContext);
  const [searchProjects, { loading, error, data }] = useLazyQuery(SEARCH_PROJECTS_QUERY, {
    variables: {
      projectType,
      activity,
      nationality,
      destination,
    },
  });
  return (
    <ProjectsPage>
      <SearchPanel values={values} updateValue={updateValue} submit={searchProjects} />
      <ProjectsList projects={data?.searchProjects} userId={user?.id} loading={loading} />
    </ProjectsPage>
  );
};

export default Projects;
