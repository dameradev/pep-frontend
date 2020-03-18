import React from 'react';
import Project from '../components/Project';

const project = props => {
  return <Project id={props.query.id} />;
};

export default project;
