import React, { Component } from 'react';
import styled from 'styled-components';
import SingleProject from './SingleProject';

import { respondTo } from '../../lib/respondTo';

const Center = styled.div`
  margin-top: 2rem;
  h1 {
    font-weight: 300;

    ${respondTo.tabletMini`
      padding: 2rem 2rem 10rem 2rem;
    `}
  }
`;

const ProjectList = styled.div`
  font-size: 1.2rem;
`;

const Search = (props) => {
  const { projects, userId, loading } = props;
  return (
    <Center>
      <>
        <ProjectList>
          {!projects ? (
            <h1>Please enter search parameters on the search panel to get results</h1>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <SingleProject key={project.id} project={project} userId={userId} loading={loading} />
            ))
          ) : (
            <h1>No results for your parameters</h1>
          )}
        </ProjectList>
      </>

      {/* }}
        </Query> */}
    </Center>
  );
};
export default Search;
