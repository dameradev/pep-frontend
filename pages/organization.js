import React from 'react';
import Organization from '../components/Organization';

const OrganizationPage = props => {
  return <Organization id={props.query.id} />;
};

export default OrganizationPage;
