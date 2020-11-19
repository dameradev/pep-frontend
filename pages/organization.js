import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Query, Mutation, useLazyQuery, useQuery } from 'react-apollo';
import Organization from '../components/Organization';
import styled from 'styled-components';

import { SINGLE_ORGANIZATION_QUERY } from '../lib/queries';
import { respondTo } from '../lib/respondTo';

const OrganizationSkeleton = styled.div`
  .skeleton-content {
    margin: 2rem 5%;
    display: grid;
    grid-template-columns: 1fr 25rem;
    gap: 3rem;

    ${respondTo.tabletMini`
      margin: 0;
      display:block;
    `}
  }
`;

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
    <OrganizationSkeleton>
      <Skeleton height={200} />
      <div className="skeleton-content">
        <Skeleton height={800} />
        <Skeleton height={400} />
      </div>
    </OrganizationSkeleton>
  );
};

export default OrganizationPage;
