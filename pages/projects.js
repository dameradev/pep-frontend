import ProjectsList from '../components/Projects';

import SearchPanel from '../components/SearchPanel';
import styled from 'styled-components';

const ProjectsPage = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 3rem;
  padding: 0 15rem;
`;

const Projects = (props) => {
  return (
    <ProjectsPage>
      <SearchPanel />
      <ProjectsList />
    </ProjectsPage>
  );
};

export default Projects;
