import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { SearchPanelStyles } from './styles';
import Filters from './filters';
import { Button } from '@material-ui/core';

const SearchPanel = ({ values, updateValue, submit }) => {
  return (
    <SearchPanelStyles>
      <div className="Header">
        <h3> Search filters </h3>
        <div className="filters">
          <Filters values={values} updateValue={updateValue} submit={submit} />
          <Button variant="outlined" color="primary" onClick={() => submit()} type="submit">
            Search
          </Button>
        </div>
      </div>
      <div className="filters"></div>
    </SearchPanelStyles>
  );
};

export default SearchPanel;
