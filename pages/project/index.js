import React from 'react';
import { useQuery } from 'react-apollo';
import Project from '../../components/Project';
import { SINGLE_PROJECT_QUERY } from '../../lib/queries';

const project = (props) => {
  const { loading, data: { project } = {} } = useQuery(SINGLE_PROJECT_QUERY, {
    variables: { id: props.query.id },
  });

  return <Project project={project} query={props.query} />;
};

export default project;
