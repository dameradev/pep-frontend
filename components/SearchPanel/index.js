import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { TextField, MenuItem, Button } from '@material-ui/core';

import { Panel } from './styles';

const SearchPanel = (props) => {
  return props.loading ? (
    <Skeleton height={800} style={{ marginTop: '3.5rem' }} />
  ) : (
    <Panel>
      <div className="Header">
        <h3> Search filters </h3>
      </div>
      <div className="filters">
        <TextField
          select
          label="Select"
          value={props.projectType}
          onChange={(e) => props.setProjectType(e.target.value)}
          helperText="Select type of project"
          children={props.projectTypes}
        >
          {props.projectTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Select"
          value={props?.country}
          onChange={(e) => props.setCountry(e.target.value)}
          helperText="Select type of project"
          children={props.countries}
        >
          {props.countries?.map((option) => (
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
