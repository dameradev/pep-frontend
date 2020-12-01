import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { SearchPanelStyles } from './styles';
import Filters from './Filters';
import { Button } from '@material-ui/core';
import ButtonStyled from '../styles/ButtonStyled';

const SearchPanel = ({ values, updateValue, submit }) => {
  return (
    <SearchPanelStyles>
      <div className="Header">
        <h3> Search filters </h3>
        <div className="filters">
          <Filters values={values} updateValue={updateValue} submit={submit} />
          <ButtonStyled bgColor="blue" onClick={() => submit()} type="submit">
            Search
          </ButtonStyled>
        </div>
      </div>
    </SearchPanelStyles>
  );
};

export default SearchPanel;
