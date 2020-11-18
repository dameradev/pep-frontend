import React from 'react';
import { useQuery } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../utils/queries';
const useCurrentUser = () => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    variables: { token: localStorage.getItem('token') },
  });

  return data?.me;
};

export default useCurrentUser;
