import ProjectsList from "../components/Projects";

import ContentContainer from "../components/ContentContainer";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import SearchPanel from "../components/SearchPanel"


const Projects = props => {
  return (
    
<ContentContainer>
      <LeftPanel>
        <ProjectsList />
      </LeftPanel>
      <RightPanel>
        <SearchPanel />
      </RightPanel>
      </ContentContainer>
      
    
  );
};

export default Projects;
