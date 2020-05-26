import React from 'react';
import Organization from '../components/Organization';

const OrganizationPage = (props) => {
  return (
    // <ContentContainer>
    //   <LeftPanel>
    <Organization id={props.query.id} path={props.query.path} />
    //   </LeftPanel>
    // </ContentContainer>
  );
};

export default OrganizationPage;
