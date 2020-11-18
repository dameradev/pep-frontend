import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../utils/queries';

const UserContext = React.createContext({});

export const UserProvider = (props) => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY);
  const user = loading || !data?.me ? null : data?.me;
  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
};
export const UserConsumer = UserContext.Consumer;
export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
