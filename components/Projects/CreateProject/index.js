import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Formik, Field } from 'formik';
import Select from 'react-select';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import { TextField, MenuItem } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { FormWrapper, CountriesStyled } from './styles';

import { respondTo } from '../../../utils/respondTo';

import { GET_ALL_COUNTRIES_QUERY } from '../../../utils/queries';

const LocationPicker = dynamic(() => import('react-location-picker'), {
  ssr: false,
});

import Geosuggest from 'react-geosuggest';
// import Form from "../../styles/Form";
import styled from 'styled-components';
import Error from '../../ErrorMessage';

import ButtonStyled from '../../styles/ButtonStyled';

const numberOfParticipants = [
  { value: 0, label: '0 Spots left' },
  { value: 1, label: '1 Spots left' },
  { value: 2, label: '2 Spots left' },
  { value: 3, label: '3 Spots left' },
  { value: 4, label: '4 Spots left' },
  { value: 5, label: '5 Spots left' },
  { value: 6, label: '6 Spots left' },
  { value: 7, label: '7 Spots left' },
];

const options = [
  { value: 'ESC', label: 'ESC' },
  { value: 'Training_Course', label: 'Training_Course' },
  { value: 'Youth_Exchange', label: 'Youth_Exchange' },
];

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATION(
    $title: String
    $description: String
    $costs: String
    $totalNumberOfParticipants: Float
    $projectType: ProjectType
    $activity: specificActivity
    $location: LocationCreateInput
    $nations: [NationCreateWithoutProjectInput!]! # $objectives: [String!]! # $date: Date
    $startDate: DateTime
    $endDate: DateTime
  ) {
    createProject(
      title: $title
      description: $description
      costs: $costs
      totalNumberOfParticipants: $totalNumberOfParticipants
      projectType: $projectType
      activity: $activity
      # objectives: $objectives
      # date: $date

      nations: $nations
      location: $location
      startDate: $startDate
      endDate: $endDate
    ) {
      id
    }
  }
`;

const ProjectFormWrapper = styled.div`
  /* background: black; */

  .guidelines {
    ${respondTo.tabletMini` 
      display: none;
    `}
  }
  .form {
    padding: 2rem;
    background: #eee;
    text-align: start;
    color: #505050;
    /* width: 100%; */
    /* height: 100vh; */
    ${respondTo.tabletMini` 
      background: unset;
    `}
    form {
      /* grid-column: full-start/ full-end; */
      width: 100%;
      display: grid;

      grid-template-columns:
        [full-start]
        minmax(6rem, 1fr) [center-start]repeat(8, [col-start] minmax(min-content, 18rem) [col-end])
        [center-end] minmax(6rem, 1fr) [full-end];

      ${respondTo.tabletMini` 
        display: flex;
        flex-direction: column;
      `}
    }
    h1 {
      grid-column: full-start / full-end;
    }

    label {
      text-transform: uppercase;
      color: ${(props) => props.theme.blue};
      font-weight: 600;
    }

    input,
    textarea,
    select {
      /* background: #eee;
      color: #050505; */
      /* transition: all 0.4s; */

      &::placeholder {
        /* color: currentColor; */
      }

      :focus {
        /* border: 1px solid #2f5db7; */
      }
    }

    &__input {
      width: 100%;
      padding-bottom: 2rem;

      label,
      input {
        font-size: 1.6rem;
      }
    }

    &__select {
      width: 100%;

      label {
        font-size: 1.4rem;
        margin-right: 1rem;
      }
      p {
        font-size: 1rem;
      }

      .MuiInput-input {
        font-size: 1.4rem;
        display: flex;
        align-items: center;
      }
    }

    &__description,
    &__costs {
      width: 100%;
    }

    &__input-group {
      grid-column: col-start 4 / full-end;
      padding: 2rem;
      margin-bottom: 3rem;
      /* box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1); */
      background: #fff;
      border-radius: 5px;
    }

    .basic-details {
      display: grid;
      /* grid-template-columns: minmax(30rem, 1fr) minmax(15rem, max-content); */
      grid-template-columns: repeat(3, 1fr);
      grid-auto-flow: column;
      grid-gap: 2rem;
      justify-items: top;
      /* align-content: start; */

      ${respondTo.tabletMini` 
        display: flex;
        flex-direction: column;
      `}

      &__title {
        /* color: blue; */
        width: 100%;
        grid-column: 1 / 3;
      }

      &__dates {
        display: flex;
        flex-direction: row;
        grid-column: 1 / 3;
        gap: 2rem;
        ${respondTo.tabletMini` 
        
        gap: 2rem;
      `}
      }

      &__start-date {
        grid-row: 2 / 3;
        grid-column: 1 / 2;

        width: 100%;
        margin: 0;
      }

      &__end-date {
        grid-row: 2 / 3;
        grid-column: 2 / 3;

        width: 100%;
        margin: 0;
      }

      &__type {
        grid-column: 3 / 4;
        width: 100%;
      }

      &__activity {
        width: 100%;
        grid-column: 3 / 4;
        grid-row: 2 / 3;
      }
    }
  }

  .publish {
    padding: 2rem 3rem;
    font-size: 2rem;
    width: 100%;
    border: none;
    background-color: ${(props) => props.theme.blue};
    color: #fff;
    outline: none;
    grid-column: full-start / full-end;
    transition: all 0.2s;

    &:hover {
      background: #2f5db7;
    }

    &:active {
      transform: translateY(3px);
    }
  }
`;

class CreateProject extends Component {
  state = {
    countriesSelected: [],
    location: {
      address: 'Rue de la Loi 41, 1000 Bruxelles, Belgium',
      lat: 50.8,
      lng: 3.9,
    },
    locationSelected: false,
  };

  onLocationSelect = (locationData) => {
    try {
      const { location, gmaps: { formatted_address } = {} } = locationData;

      this.setState({
        location: { position: location, address: formatted_address },

        locationSelected: true,
      });
    } catch (e) {
      this.setState({
        location: { position: { lat: 50.8, lng: 3.9 } },
        locationSelected: false,
      });
    }
  };

  handleLocationChange({ position, address, places }) {
    this.setState({ location: { position, address } });
  }

  render() {
    const {
      countriesSelected,
      locationSelected,
      location: { address } = {},
      location,
    } = this.state;
    // console.log(this.state.countriesSelected)
    return (
      <Mutation mutation={CREATE_PROJECT_MUTATION}>
        {(createProject, { loading, error }) => (
          <ProjectFormWrapper>
            <Formik
              initialValues={{
                title: '',
                description: '',
                costs: '',
                totalNumberOfParticipants: '',
                projectType: '',
                activity: '',
                nations: [],
                location: location,
                startDate: new Date(),
                endDate: new Date(),
              }}
              onSubmit={async (values, actions) => {
                const {
                  title,
                  description,
                  costs,
                  totalNumberOfParticipants,
                  projectType,
                  activity,
                  nations,
                  location,
                  startDate,
                  endDate,
                } = values;

                let newCountries = [];
                this.state.countriesSelected.forEach((country) =>
                  newCountries.push({
                    name: country.country,
                    numberOfParticipants: country.numberOfParticipants,
                  })
                );

                createProject({
                  variables: {
                    title,
                    description,
                    costs,
                    totalNumberOfParticipants,
                    projectType,
                    activity,
                    nations: newCountries,
                    location,
                    startDate,
                    endDate,
                  },
                });
                // You can access the signup mutation in here now
                // You can access values.name, values.email, values.password
                // You can access actions, e.g. actions.setSubmitting(false) once you've finished the mutation
              }}
            >
              {({ handleChange, handleSubmit, handleBlur, values, setFieldValue }) => {
                console.log(values);
                return (
                  <FormWrapper onSubmit={handleSubmit} className="form">
                    {/* <h1>Please fill in the required information to publish your project!</h1> */}
                    <div className="guidelines">
                      <h2>Guidelines</h2>
                    </div>
                    <Form>
                      {/* <Error error={error} /> */}

                      <div className="form__input-group basic-details">
                        <div className="basic-details__title">
                          {/* <label>Project Title</label> */}
                          <TextField
                            className="form__input"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            name="title"
                            placeholder="Title"
                            id="standard-basic"
                            label="Project Title"
                            variant="standard"
                          />
                        </div>
                        <div className="basic-details__dates">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            {/* <div className="basic-details__start-date"> */}
                            <KeyboardDatePicker
                              className="basic-details__start-date"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="Start date"
                              name="startDate"
                              inputProps={{ className: 'input' }}
                              value={values.startDate}
                              onChange={(value) => setFieldValue('startDate', value)}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                            {/* </div> */}

                            <KeyboardDatePicker
                              className="basic-details__end-date"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="Date picker inline"
                              label="End date"
                              name="endDate"
                              value={values.endDate}
                              onChange={(value) => setFieldValue('endDate', value)}
                              // KeyboardButtonProps={{
                              //   'aria-label': 'change date',
                              // }}
                            />
                          </MuiPickersUtilsProvider>
                        </div>

                        <div className="basic-details__type">
                          {/* <label>Project Type</label> */}

                          <TextField
                            className="form__select"
                            id="input"
                            select
                            label="Project Type"
                            name="projectType"
                            value={values.projectType}
                            onChange={handleChange}
                            helperText="Please select type of project"
                          >
                            {options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                        <div className="basic-details__activity">
                          <TextField
                            className="form__select"
                            id="input"
                            select
                            label="Specific activity"
                            name="activity"
                            value={values.activity}
                            onChange={handleChange}
                            helperText="Please select type of project"
                          >
                            {options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>

                          {/* <label>Specific Activity</label>
                          <select
                            name="activity"
                            value={values.activity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ display: 'block' }}
                          >
                            {options.map((option) => (
                              <option value={option.value} label={option.label} />
                            ))}
                          </select> */}
                        </div>
                      </div>

                      <div className="form__input-group">
                        <TextField
                          className="form__description"
                          id="outlined-multiline-flexible"
                          label="Detailed description of project"
                          multiline
                          name="description"
                          rows={8}
                          value={values.description}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form__input-group">
                        <TextField
                          className="form__costs"
                          id="outlined-multiline-flexible"
                          label="Costs covered by erasmus+"
                          multiline
                          name="costs"
                          rows={8}
                          value={values.costs}
                          onChange={handleChange}
                        />
                      </div>

                      {/* <div className="form__input-group type-participants"></div> */}
                      <Query query={GET_ALL_COUNTRIES_QUERY}>
                        {({ data }) => {
                          const options = [];
                          data &&
                            data.countries.forEach((country) => {
                              options.push({
                                label: country.name,
                                value: country.name,
                              });
                            });

                          return (
                            <CountriesStyled className="form__input-group">
                              <div className="total-participants">
                                <label>Total number of participants</label>
                                <TextField
                                  className="total-participants__input"
                                  id="outlined-multiline-flexible"
                                  // label=""
                                  name="totalNumberOfParticipants"
                                  value={values.totalNumberOfParticipants}
                                  onChange={handleChange}
                                  variant="outlined"
                                />
                              </div>

                              <div className="wrapper">
                                <label>Participating Countries</label>
                                <Select
                                  className="select-box"
                                  options={options && options}
                                  isMulti
                                  isSearchable
                                  onChange={
                                    (options, option) => {
                                      const countriesSelected = [...this.state.countriesSelected];
                                      console.log(countriesSelected);
                                      countriesSelected.push({
                                        country: option.option?.value,
                                        numberOfParticipants: 0,
                                      });
                                      this.setState({ countriesSelected });
                                    }
                                    // this.setState({ countriesSelected: {country: option.option.value , numberOfParticipants: 0} })
                                  }
                                  placeholder="0 countries selected"
                                />
                              </div>

                              {countriesSelected.length > 0 &&
                                countriesSelected.map((country) => (
                                  <div className="country-block">
                                    {/* <Select
                                        name="numberOfParticipants"
                                        options={numberOfParticipants}
                                        onChange={(num) => {
                                          const countriesSelected = [
                                            ...this.state.countriesSelected,
                                          ];
                                          countriesSelected.find(
                                            (c) => c.country === country.country
                                          ).numberOfParticipants = num.value;
                                          this.setState({ countriesSelected });
                                        }}
                                        onBlur={handleBlur}
                                        style={{ display: 'block' }}
                                      /> */}
                                    <label>{country.country}</label>
                                    <TextField
                                      className="country"
                                      id="standard-basic"
                                      // label={country.country}
                                      variant="outlined"
                                    />
                                    {/* {numberOfParticipants.map(num => (
                                            <option
                                              value={num.value}
                                              label={num.label}
                                            />
                                          ))}
                                        </select> */}
                                  </div>
                                ))}
                            </CountriesStyled>
                          );
                        }}
                      </Query>
                      <div className="form__input-group project-window__form-item project-window__location">
                        <div className="project-window__location-search-wrapper">
                          <div>
                            <label>Location of the project</label>
                            <Geosuggest
                              onChange={() => this.setState({ locationSelected: false })}
                              className={
                                locationSelected
                                  ? 'project-window__location-selected project-window__location-search'
                                  : 'project-window__location-search'
                              }
                              inputClassName="project-window__location-search-input"
                              placeholder="Search for location of the project"
                              onSuggestSelect={({ location, gmaps }) => {
                                values.location.lng = location && location.lng;
                                values.location.lat = location && location.lat;
                                values.location.address = location && gmaps.formatted_address;
                                this.onLocationSelect(location);
                              }}
                            />
                          </div>
                          <p className="project-window__location-address">{address}</p>
                        </div>

                        <LocationPicker
                          containerElement={<div style={{ height: '100%', width: '60%' }} />}
                          mapElement={<div style={{ height: '400px', width: 'auto' }} />}
                          defaultPosition={this.state.location}
                        />
                      </div>

                      <button
                        className="publish"
                        type="submit"
                        disabled={loading}
                        btnColor={(props) => props.theme.blue}
                      >
                        Publish Project
                      </button>
                    </Form>
                  </FormWrapper>
                );
              }}
            </Formik>
          </ProjectFormWrapper>
        )}
      </Mutation>
    );
  }
}

export default CreateProject;
export { CREATE_PROJECT_MUTATION };
