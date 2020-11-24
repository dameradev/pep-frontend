import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import { GET_ALL_COUNTRIES_QUERY } from '../lib/queries';

const CountriesContext = React.createContext({});

export const CountriesProvider = (props) => {
  const { loading, data } = useQuery(GET_ALL_COUNTRIES_QUERY);
  let countries = loading || !data?.countries ? null : data?.countries;

  return (
    <CountriesContext.Provider value={{ countries, loading }}>
      {props.children}
    </CountriesContext.Provider>
  );
};
export const CountriesConsumer = CountriesContext.Consumer;
export default CountriesContext;

CountriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
