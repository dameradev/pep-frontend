import React, { useState } from 'react';
import Select from 'react-select';

import styled from 'styled-components';

import { TextField, MenuItem, Button } from '@material-ui/core';

import { respondTo } from '../../utils/respondTo';

const Panel = styled.div`
  margin-top: 2rem;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 7px;
  min-height: 80vh;
  /* padding: 20px; */

  ${respondTo.tabletMini` 
    // height: 20rem !important;
    min-height: unset;
  `}

  .Header {
    border-bottom: 1px solid ${(props) => props.theme.borderColorPrimary};
    padding: 2rem;

    h3 {
      text-transform: uppercase;
      font-size: 2.5rem;
      font-weight: 300;
    }
  }
  .filters {
    padding: 2rem;
    display: grid;
    grid-gap: 2rem;
    &__location {
      min-width: 20rem;
    }
  }
`;

const SearchPanel = (props) => {
  return (
    <Panel>
      <div className="Header">
        <h3> Search filters </h3>
      </div>
      <div className="filters">
        {/* <Select className="filters__location" placeholder="Location" />
        <Select className="filters__type" placeholder="Type of project" /> */}

        <TextField
          // id="standard-select-currency"
          select
          label="Select"
          value={props.projectType}
          onChange={(e) => props.setProjectType(e.target.value)}
          helperText="Select type of project"
        >
          {props.projectTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          // id="standard-select-currency"
          select
          label="Select"
          value={props.nation}
          onChange={(e) => props.setNation(e.target.value)}
          helperText="Select type of project"
        >
          {props.nations?.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="outlined" color="primary" onClick={() => props.submit()} type="submit">
          Search
        </Button>
      </div>
    </Panel>
  );
};

export default SearchPanel;
