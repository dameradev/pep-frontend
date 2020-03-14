import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Formik, Field } from 'formik';
import Select from 'react-select';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import { FormWrapper, CountriesStyled } from './styles';

const LocationPicker = dynamic(() => import('react-location-picker'), {
  ssr: false
});

import Geosuggest from 'react-geosuggest';
// import Form from "../../styles/Form";
import styled from 'styled-components';
import Error from '../../ErrorMessage';

import { ButtonStyled } from '../../SearchBox';

const numberOfParticipants = [
  { value: 0, label: '0 Spots left' },
  { value: 1, label: '1 Spots left' },
  { value: 2, label: '2 Spots left' },
  { value: 3, label: '3 Spots left' },
  { value: 4, label: '4 Spots left' },
  { value: 5, label: '5 Spots left' },
  { value: 6, label: '6 Spots left' },
  { value: 7, label: '7 Spots left' }
];

const options = [
  { value: 'ESC', label: 'ESC' },
  { value: 'Training_Course', label: 'Training_Course' },
  { value: 'Youth_Exchange', label: 'Youth_Exchange' }
];

const GET_ALL_COUNTRIES_QUERY = gql`
  query GET_ALL_COUNTRIES_QUERY {
    getCountries {
      name
    }
  }
`;

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATION(
    $title: String!
    $description: String!
    $costs: String!
    $totalNumberOfParticipants: Float!
    $projectType: ProjectType!
    $activity: specificActivity!
    $location: LocationCreateInput
    $nations: [NationCreateWithoutProjectInput!]! # $objectives: [String!]!
  ) # $date: Date
  {
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
    ) {
      id
    }
  }
`;

class CreateProject extends Component {
  state = {
    countriesSelected: [],
    location: {
      address: 'Rue de la Loi 41, 1000 Bruxelles, Belgium',
      lat: 50.8,
      lng: 3.9
    },
    locationSelected: false
  };

  onLocationSelect = locationData => {
    try {
      const { location, gmaps: { formatted_address } = {} } = locationData;

      this.setState({
        location: { position: location, address: formatted_address },

        locationSelected: true
      });
    } catch (e) {
      this.setState({
        location: { position: { lat: 50.8, lng: 3.9 } },
        locationSelected: false
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
      location
    } = this.state;
    // console.log(this.state.countriesSelected)
    return (
      <Mutation mutation={CREATE_PROJECT_MUTATION}>
        {(createProject, { loading }) => (
          <Formik
            initialValues={{
              title: 'title',
              description: 'descr',
              costs: 'cost',
              totalNumberOfParticipants: '10',
              projectType: 'ESC',
              activity: 'ESC',
              nations: [],
              location: location
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
                location
              } = values;

              let newCountries = [];
              this.state.countriesSelected.forEach(country =>
                newCountries.push({
                  name: country.country,
                  numberOfParticipants: country.numberOfParticipants
                })
              );

              console.log(newCountries);
              console.log(location, 'DAMJAN');
              createProject({
                variables: {
                  title,
                  description,
                  costs,
                  totalNumberOfParticipants,
                  projectType,
                  activity,
                  nations: newCountries,
                  location
                }
              });
              // You can access the signup mutation in here now
              // You can access values.name, values.email, values.password
              // You can access actions, e.g. actions.setSubmitting(false) once you've finished the mutation
            }}
          >
            {({ handleChange, handleSubmit, handleBlur, values }) => {
              return (
                <FormWrapper onSubmit={handleSubmit}>
                  <Form>
                    <h1>Please fill in the required information to publish your project!</h1>

                    <div className="form-input__group">
                      <label>Title of the project</label>
                      <Field
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        name="title"
                        placeholder="Title"
                      />
                    </div>

                    <div className="form-input__group">
                      <label>Detailed description</label>
                      <textarea
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        name="description"
                        placeholder="Type in details of the project"
                      />
                    </div>

                    <div className="form-input__group">
                      <label>Briefly describe what is covered by Erasmus</label>
                      <textarea
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.costs}
                        name="costs"
                        placeholder="Covered costs by erasmus"
                      />
                    </div>

                    <div className="form-input__group type-participants">
                      <div>
                        <label>Total number of pariticipants</label>
                        <input
                          name="totalNumberOfParticipants"
                          placeholder="Number of paricipants"
                          value={values.totalNumberOfParticipants}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div>
                        <label>Type of project</label>
                        <select
                          name="projectType"
                          value={values.projectType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: 'block' }}
                        >
                          {options.map(option => (
                            <option value={option.value} label={option.label} />
                          ))}
                        </select>
                      </div>
                      <div>
                        <label>Specific activity</label>
                        <select
                          name="activity"
                          value={values.activity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ display: 'block' }}
                        >
                          {options.map(option => (
                            <option value={option.value} label={option.label} />
                          ))}
                        </select>
                      </div>
                    </div>
                    <Query query={GET_ALL_COUNTRIES_QUERY}>
                      {({ data }) => {
                        const options = [];
                        data.getCountries.forEach(country => {
                          options.push({
                            label: country.name,
                            value: country.name
                          });
                        });

                        return (
                          <CountriesStyled>
                            <label>Participating Countries</label>
                            <div className="wrapper">
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
                                      country: option.option.value,
                                      numberOfParticipants: 0
                                    });
                                    this.setState({ countriesSelected });
                                  }
                                  // this.setState({ countriesSelected: {country: option.option.value , numberOfParticipants: 0} })
                                }
                                placeholder="0 countries selected"
                              />
                              <div className="countries-block">
                                {countriesSelected.length > 0 &&
                                  countriesSelected.map(country => (
                                    <div className="country-block">
                                      <p className="label">{country.label}</p>
                                      <div>
                                        <p>Number of participants spots left</p>
                                        <Select
                                          name="numberOfParticipants"
                                          options={numberOfParticipants}
                                          onChange={num => {
                                            const countriesSelected = [
                                              ...this.state.countriesSelected
                                            ];
                                            countriesSelected.find(
                                              c => c.country === country.country
                                            ).numberOfParticipants = num.value;
                                            this.setState({ countriesSelected });
                                          }}
                                          onBlur={handleBlur}
                                          style={{ display: 'block' }}
                                        />
                                        {/* {numberOfParticipants.map(num => (
                                            <option
                                              value={num.value}
                                              label={num.label}
                                            />
                                          ))}
                                        </select> */}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </CountriesStyled>
                        );
                      }}
                    </Query>
                    <div className="project-window__form-item project-window__location">
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

                    <ButtonStyled
                      type="submit"
                      disabled={loading}
                      btnColor={props => props.theme.blue}
                    >
                      {' '}
                      Publish Project{' '}
                    </ButtonStyled>
                  </Form>
                </FormWrapper>
              );
            }}
          </Formik>
        )}
      </Mutation>
    );
  }
}

export default CreateProject;
export { CREATE_PROJECT_MUTATION };
