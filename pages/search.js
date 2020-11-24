import { useState, useContext } from 'react';
import ProjectsList from '../components/Projects';

import { useLazyQuery } from 'react-apollo';

import SearchPanel from '../components/SearchPanel';
import styled from 'styled-components';

import { projectTypes } from '../config';
import { SEARCH_PROJECTS_QUERY } from '../lib/queries';

import { respondTo } from '../lib/respondTo';
import UserContext from '../contexts/userContext';
import CountriesContext from '../contexts/CountriesContext';

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

const Projects = () => {
  const [projectType, setProjectType] = useState('ESC');
  const [country, setCountry] = useState('North Macedonia');

  const user = useContext(UserContext);
  const { countries, countriesLoading } = useContext(CountriesContext);

  const [searchProjects, { loading, error, data }] = useLazyQuery(SEARCH_PROJECTS_QUERY, {
    variables: {
      projectType,
      country: country,
    },
  });
  return (
    <ProjectsPage>
      <SearchPanel
        projectTypes={projectTypes}
        projectType={projectType}
        setProjectType={setProjectType}
        countries={countries}
        country={country}
        setCountry={setCountry}
        submit={searchProjects}
        loading={countriesLoading}
      />
      <ProjectsList projects={data?.searchProjects} userId={user?.id} loading={loading} />
    </ProjectsPage>
  );
};

export default Projects;
