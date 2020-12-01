import { useContext } from 'react';
import ProjectsList from '../components/Projects';

import { useLazyQuery, useQuery } from 'react-apollo';

import SearchPanel from '../components/SearchPanel';
import styled from 'styled-components';

import { SEARCH_PROJECTS_QUERY, LOCAL_STATE_QUERY } from '../lib/queries';

import { respondTo } from '../lib/respondTo';
import useForm from '../lib/useForm';
import UserContext from '../contexts/userContext';
import { useEffect } from 'react';

import { perPage } from '../config';
import Router from 'next/router';

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

const Projects = ({ query: { search, page } }) => {
  const { data: localData } = useQuery(LOCAL_STATE_QUERY);
  const {
    values: { projectType, activity, nationality, destination } = {},
    values,
    updateValue,
  } = useForm({
    ...localData.searchData,
  });

  useEffect(() => {
    searchProjects();
  }, {});

  const user = useContext(UserContext);

  // let skip = 0;
  const skip = page * perPage - perPage;

  const [searchProjects, { loading, error, data }] = useLazyQuery(SEARCH_PROJECTS_QUERY, {
    variables: {
      projectType,
      activity,
      nationality,
      destination,
      take: perPage,
      skip,
    },
  });

  const totalCount = data?.searchProjects.totalCount;
  const numOfPages = Math.ceil(totalCount / perPage);
  const pages = [];
  for (let pageNum = 1; pageNum <= numOfPages; pageNum++) {
    pages.push(pageNum);
  }
  useEffect(() => {
    if (!data?.searchProjects.projects.length && parseInt(page) !== 1) {
      Router.push({
        pathname: `/search`,
        query: { page: 1 },
      });
    }
  });

  return (
    <ProjectsPage>
      <SearchPanel values={values} updateValue={updateValue} submit={searchProjects} />

      <ProjectsList
        projects={data?.searchProjects.projects}
        userId={user?.id}
        loading={loading}
        pages={pages}
        currentPage={parseInt(page)}
      />
    </ProjectsPage>
  );
};

export default Projects;
