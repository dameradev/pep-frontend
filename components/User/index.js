import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { CURRENT_USER_QUERY } from '../../utils/queries';

const User = (props) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  });
  return (
    <Query {...props} query={CURRENT_USER_QUERY} variables={{ token }}>
      {(payload) => props.children(payload)}
    </Query>
  );
};

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
