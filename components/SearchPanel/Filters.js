import React, { useEffect } from 'react';
import { TextField, MenuItem, Button } from '@material-ui/core';

import useTags from '../../lib/useTags';
import CountriesContext from '../../contexts/CountriesContext';
import { useContext } from 'react';
import { useMutation } from 'react-apollo';
import { SAVE_SEARCH_DATA_MUTAITON } from '../../lib/mutations';

const Filters = ({ values, updateValue, submit, variant }) => {
  const projectTypes = useTags('projectType');
  const activities = useTags('activity');
  const { countries, countriesLoading } = useContext(CountriesContext);

  const [saveSearchData, { saveSearch, loading: statusLoading }] = useMutation(
    SAVE_SEARCH_DATA_MUTAITON,
    {
      variables: {
        ...values,
      },
    }
  );

  useEffect(() => {
    saveSearchData();
  }, [values.projectType, values.activity, values.nationality, values.destination]);

  return (
    <>
      <TextField
        className="form-input"
        select
        label="Project type"
        value={values.projectType}
        name="projectType"
        onChange={updateValue}
        helperText="Select type of project"
        children={projectTypes}
      >
        <MenuItem key={'all'} value={'all'}>
          All
        </MenuItem>
        {projectTypes?.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        className="form-input"
        select
        label="Specific activity"
        value={values.activity}
        name="activity"
        onChange={updateValue}
        helperText="Select activity"
        children={activities}
      >
        <MenuItem key={'all'} value={'all'}>
          All
        </MenuItem>
        {activities?.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        className="form-input"
        select
        label="Nationality"
        value={values.nationality}
        name="nationality"
        onChange={updateValue}
        helperText="Select your nationality"
        children={countries}
      >
        <MenuItem key={'all'} value={'all'}>
          All
        </MenuItem>
        {countries?.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        className="form-input"
        select
        label="Destination"
        value={values.destination}
        name="destination"
        onChange={updateValue}
        helperText="Select country of project"
        children={countries}
      >
        <MenuItem key={'all'} value={'all'}>
          All
        </MenuItem>
        {countries?.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default Filters;
