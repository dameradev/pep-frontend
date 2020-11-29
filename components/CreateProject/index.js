import React, { Component, useContext, useState } from 'react';
import { Mutation, Query, useQuery } from 'react-apollo';

import { Form, Formik } from 'formik';
import Select from 'react-select';
import Router from 'next/router';

import { TextField, MenuItem, DialogTitle, Dialog } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {
  ProjectFormWrapper,
  FormWrapper,
  CountriesStyled,
  ErrorValidationMessageStyles,
} from './styles';

import CountriesContext from '../../contexts/CountriesContext';

import { CREATE_PROJECT_MUTATION } from '../../lib/mutations';

import * as Yup from 'yup';
import { GET_ALL_TAGS_QUERY } from '../../lib/queries';

const options = [
  { value: 'ESC', label: 'ESC' },
  { value: 'Training_Course', label: 'Training_Course' },
  { value: 'Youth_Exchange', label: 'Youth_Exchange' },
];

const ProjectSchema = Yup.object().shape({
  title: Yup.string()
    .min(20, 'Title is too short!')
    .max(100, 'Title is too long!')
    .required('Title is required'),
  totalNumberOfParticipants: Yup.number().required(
    'You must enter the total number of participants attending'
  ),
  projectType: Yup.string().required('Project type is required'),
  activity: Yup.string().required('Activity is required'),
});

const ErrorValidationMessage = (props) => {
  return (
    <ErrorValidationMessageStyles>
      {props.serverError && 'ERROR: '}
      {props.children}
    </ErrorValidationMessageStyles>
  );
};

const CreateProject = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [countriesSelected, setCountriesSelected] = useState([]);
  const [errors, setErrors] = useState([]);

  const { countries } = useContext(CountriesContext);

  const { loading, data } = useQuery(GET_ALL_TAGS_QUERY);
  const handleClose = () => {
    setDialogOpen(false);
    setServerError(false);
  };

  const countriesOptions = countries?.map((country) => {
    return { label: country.name, value: country.name };
  });

  return (
    <Mutation mutation={CREATE_PROJECT_MUTATION}>
      {(createProject, { loading, error }) => (
        <ProjectFormWrapper>
          <Dialog
            className="dialog"
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={dialogOpen}
          >
            <DialogTitle>We are creating your project please wait!</DialogTitle>
          </Dialog>

          <Dialog
            className="dialog"
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={serverError}
          >
            <DialogTitle>
              <ErrorValidationMessage serverError>{errors[0]}</ErrorValidationMessage>
            </DialogTitle>
          </Dialog>

          {/* <p>{this.state.errors[0]}</p>
            {this.state.errors.length && <ErrorMessage error={this.state.errors[0]} />} */}
          <Formik
            disabled={loading}
            initialValues={{
              title: 'Title of project testinggg',
              description: '',
              costs: '',
              totalNumberOfParticipants: 15,
              projectType: 'ESC',
              activity: 'Cultural awareness',
              nations: [],
              address: 'fdakjsnfasndj',
              startDate: new Date(),
              endDate: new Date(),
              country: 'Germany',
            }}
            validationSchema={ProjectSchema}
            onSubmit={async (values, actions) => {
              const {
                title,
                description,
                costs,
                totalNumberOfParticipants,
                projectType,
                activity,
                location,
                startDate,
                endDate,
                country,
                address,
              } = values;

              let newCountries = [];
              countriesSelected.forEach((country) =>
                newCountries.push({
                  name: country.country,
                  numberOfParticipants: country.numberOfParticipants,
                })
              );

              setDialogOpen(true);

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
                  address,
                  country,
                },
              })
                .then(({ data }) => {
                  Router.push({
                    pathname: `/project`,
                    query: { id: data.createProject.id, newProject: true },
                  });
                })
                .catch((res) => {
                  if (res.graphQLErrors) {
                    const errors = res.graphQLErrors.map((error) => {
                      return error.message;
                    });

                    setServerError(true);
                    setDialogOpen(false);
                    setErrors(errors);
                  }
                });
            }}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              setFieldValue,
              errors,
              touched,
            }) => {
              return (
                <FormWrapper onSubmit={handleSubmit} className="form">
                  <div className="guidelines">
                    <h2>Guidelines</h2>
                  </div>
                  <Form>
                    {/* <Error error={error} /> */}

                    <div className="form__input-group basic-details">
                      <div className="basic-details__title">
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
                          required
                        />
                        {errors.title && touched.title ? (
                          <ErrorValidationMessage>{errors.title}</ErrorValidationMessage>
                        ) : null}
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
                          />
                        </MuiPickersUtilsProvider>
                      </div>

                      <div className="basic-details__type">
                        <TextField
                          children={options}
                          className="form__select"
                          id="input"
                          select
                          label="Project Type"
                          required
                          name="projectType"
                          value={values.projectType}
                          onChange={handleChange}
                          helperText="Please select type of project"
                        >
                          {data?.tags.map(
                            (option) =>
                              option.type === 'projectType' && (
                                <MenuItem key={option.name} value={option.name}>
                                  {option.name}
                                </MenuItem>
                              )
                          )}
                        </TextField>

                        {errors.projectType && touched.projectType ? (
                          <ErrorValidationMessage>{errors.projectType}</ErrorValidationMessage>
                        ) : null}
                      </div>
                      <div className="basic-details__activity">
                        <TextField
                          children={options}
                          className="form__select"
                          id="input"
                          select
                          label="Specific activity"
                          name="activity"
                          required
                          value={values.activity}
                          onChange={handleChange}
                          helperText="Please select type of project"
                        >
                          {data?.tags.map(
                            (option) =>
                              option.type === 'activity' && (
                                <MenuItem key={option.name} value={option.name}>
                                  {option.name}
                                </MenuItem>
                              )
                          )}
                        </TextField>
                        {errors.activity && touched.activity ? (
                          <ErrorValidationMessage>{errors.activity}</ErrorValidationMessage>
                        ) : null}
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

                    <CountriesStyled className="form__input-group">
                      <div className="total-participants">
                        <label>Total number of participants</label>
                        <TextField
                          className="total-participants__input"
                          id="outlined-multiline-flexible"
                          required
                          // type="number"
                          name="totalNumberOfParticipants"
                          value={values.totalNumberOfParticipants}
                          onChange={handleChange}
                          variant="outlined"
                        />
                        {errors.totalNumberOfParticipants && touched.totalNumberOfParticipants ? (
                          <ErrorValidationMessage>
                            {errors.totalNumberOfParticipants}
                          </ErrorValidationMessage>
                        ) : null}
                      </div>

                      <div className="wrapper">
                        <label>Participating Countries</label>
                        <Select
                          className="select-box"
                          options={countriesOptions}
                          isMulti
                          isSearchable
                          required
                          onChange={(options, option) => {
                            let newCountriesSelected = countriesSelected?.length
                              ? [...countriesSelected]
                              : [];
                            if (option.option) {
                              newCountriesSelected.push({
                                country: option.option.value,
                                numberOfParticipants: '',
                              });
                            } else {
                              const index = newCountriesSelected.findIndex(
                                (countryItem) => countryItem.country === option.removedValue.label
                              );
                              newCountriesSelected.splice(index, 1);
                            }

                            setCountriesSelected(newCountriesSelected);
                          }}
                          placeholder="0 countries selected"
                        />
                      </div>

                      {countriesSelected?.length > 0 &&
                        countriesSelected.map((countryParent) => (
                          <div className="country-block">
                            <label>{countryParent.country}</label>
                            <TextField
                              className="country"
                              id="standard-basic"
                              required
                              type="number"
                              value={countryParent.numberOfParticipants}
                              onChange={(e) => {
                                const newCountries = [...countriesSelected];
                                const currentIndex = newCountries.findIndex(
                                  (countryItem) => countryItem.country === countryParent.country
                                );
                                newCountries[currentIndex].numberOfParticipants = parseInt(
                                  e.target.value
                                );
                                setCountriesSelected(newCountries);
                              }}
                              variant="outlined"
                            />
                          </div>
                        ))}
                    </CountriesStyled>

                    <div className="form__input-group location-input">
                      <TextField
                        className="form__input"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        name="address"
                        placeholder="Please enter full address with zipcode and city/town"
                        id="standard-basic"
                        label="Full address of project"
                        variant="standard"
                        required
                      />
                      {errors.address && touched.address ? (
                        <ErrorValidationMessage>{errors.address}</ErrorValidationMessage>
                      ) : null}

                      <TextField
                        children={countriesOptions}
                        select
                        className="form__input"
                        onChange={handleChange}
                        value={values.country}
                        name="country"
                        placeholder="Please select country of project"
                        id="standard-basic"
                        label="Based in country"
                        variant="standard"
                        required
                      >
                        {countriesOptions?.map((countryItem) => (
                          <MenuItem key={countryItem.value} value={countryItem.value}>
                            {countryItem.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      {errors.address && touched.address ? (
                        <ErrorValidationMessage>{errors.address}</ErrorValidationMessage>
                      ) : null}
                    </div>
                    <button
                      className="publish"
                      type="submit"
                      disabled={loading}
                      onClick={() => {
                        if (errors) {
                          window.scrollTo(0, 0);
                        }
                      }}
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
};

export default CreateProject;
