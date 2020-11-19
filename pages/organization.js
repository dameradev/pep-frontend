import React, { useEffect } from 'react';
import { Query, Mutation, useLazyQuery, useQuery } from 'react-apollo';
import Organization from '../components/Organization';

import { SINGLE_ORGANIZATION_QUERY } from '../lib/queries';

const OrganizationPage = (props) => {
  const { loading, error, data } = useQuery(SINGLE_ORGANIZATION_QUERY, {
    variables: { id: props.query.id },
  });

  return !loading ? (
    <Organization
      id={props.query.id}
      path={props.query.path}
      edit={props.query.edit}
      organization={data.organization}
      organizationProfile={data.organization?.organizationProfile}
    />
  ) : (
    'Loading'
  );
};

export default OrganizationPage;
