import Router from 'next/router';
import React, { Component } from 'react';
import { useQuery } from 'react-apollo';
import { LOCAL_STATE_QUERY } from '../../lib/queries';
import useForm from '../../lib/useForm';
import Filters from '../SearchPanel/Filters';
import ButtonStyled from '../styles/ButtonStyled';

const SearchBox = () => {
  const { data: localData } = useQuery(LOCAL_STATE_QUERY);
  const {
    values: { projectType, activity, nationality, destination } = {},
    values,
    updateValue,
  } = useForm({
    ...localData.searchData,
  });

  return (
    <div className="searchbox-container">
      <h2>Find the perfect project</h2>
      <Filters values={values} updateValue={updateValue} variant={'outlined'} />
      <ButtonStyled
        onClick={() => {
          Router.push({
            pathname: '/search',
            query: { search: true },
          });
        }}
        bgColor="red"
        align="flex-end"
      >
        Search
      </ButtonStyled>
    </div>
  );
};

export default SearchBox;
