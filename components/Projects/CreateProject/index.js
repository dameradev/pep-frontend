import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { Form, Formik, Field } from "formik";
import Select from "react-select";
import Router from "next/router";
import dynamic from "next/dynamic";

const LocationPicker = dynamic(() => import("react-location-picker"), {
  ssr: false
});

import Geosuggest from "react-geosuggest";
// import Form from "../../styles/Form";
import styled from "styled-components";
import Error from "../../ErrorMessage";

import { ButtonStyled } from "../../../pages/index";

const numberOfParticipants = [
  { value: 0, label: "0 Spots left" },
  { value: 1, label: "1 Spots left" },
  { value: 2, label: "2 Spots left" },
  { value: 3, label: "3 Spots left" },
  { value: 4, label: "4 Spots left" },
  { value: 5, label: "5 Spots left" },
  { value: 6, label: "6 Spots left" },
  { value: 7, label: "7 Spots left" }
];

const FormWrapper = styled.div`
  width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  text-align: center;
  form {
    input,
    textarea,
    select {
      width: 100%;
      padding: 10px;
      margin: 5px 0;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1.5rem;
    }

    button {
      color: ${props => props.theme.black};
      &:hover {
        color: white;
      }
    }

    .form-input__group {
      text-align: left;
    }

    .type-participants {
      display: flex;
      justify-content: space-between;
      div {
        width: 30%;
      }
    }

    .project-window {
      &__location {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;

        &-selected {
          .geosuggest {
            &__suggests-wrapper {
              ul {
                display: none;
              }
            }
          }
        }

        &-search-wrapper {
          width: 35%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          div {
            height: 20%;
          }
        }

        &-search {
          width: 100%;
          position: relative;
          padding-top: 15px;

          &-input {
            width: 100%;
            font-size: 16px;
            padding: 5px;
            color: inherit;
          }

          .geosuggest {
            &__suggests-wrapper {
              ul {
                list-style-type: none;
                box-shadow: 0.05em 0.01em 0.5em rgba(0, 0, 0, 0.2);
                position: relative;
                top: 30px;

                li {
                  border-bottom: 1px solid grey;
                  padding: 5px;

                  mark {
                    text-decoration: underline;
                    background: none;
                    font-weight: 600;
                  }
                }
              }
            }

            &__item {
              background: white;
            }

            &__item--active {
              background: rgba(0, 0, 0, 0.2);
            }
          }
        }
      }
    }
  }
`;
const CountriesStyled = styled.div`
  margin: 1rem 0;

  text-align: left;
  .wrapper {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .select-box {
    width: 45%;
    height: 20%;
  }
  .countries-block {
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: space-between;
    .country-block {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 1rem 0;
      .label {
        width: 40%;
      }
    }
  }
`;

const options = [
  { value: "ESC", label: "ESC" },
  { value: "Training_Course", label: "Training_Course" },
  { value: "Youth_Exchange", label: "Youth_Exchange" }
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
    $projectType: ProjectType!
    $objectives: [String!]!
    $date: Date
    $location: String!
    $costs: String!
    $countries: [ParticipatingCountry!]!
  ) {
    createProject(
      title: $title
      description: $description
      projectType: $projectType
      objectives: $objectives
      date: $date
      location: $location
      costs: $costs
      countries: $countries
    ) {
      id
    }
  }
`;

class CreateProject extends Component {
  state = {
    countriesSelected: [],
    location: {
      address: "Rue de la Loi 41, 1000 Bruxelles, Belgium",
      position: {
        lat: 50.8,
        lng: 3.9
      }
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

    return (
      <Mutation mutation={CREATE_PROJECT_MUTATION}>
        {(createProject, { loading }) => (
          <Formik
            initialValues={{
              title: "",
              description: "",
              projectType: "ESC",
              countries: [],
              location: location
            }}
            onSubmit={async (values, actions) => {
              const {
                title,
                description,
                projectType,
                countries,
                costs
              } = values;

              let newCountries = countries.map(country => country.label);

              createProject({
                variables: {
                  title,
                  description,
                  projectType,
                  countries: newCountries
                }
              });
              // You can access the signup mutation in here now
              // You can access values.name, values.email, values.password
              // You can access actions, e.g. actions.setSubmitting(false) once you've finished the mutation
            }}
          >
            {({ handleChange, handleSubmit, handleBlur, values }) => (
              <FormWrapper onSubmit={handleSubmit}>
                <Form>
                  <h1>
                    Please fill in the required information to publish your
                    project!
                  </h1>

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
                      <input placeholder="Number of paricipants" />
                    </div>
                    <div>
                      <label>Type of project</label>
                      <select
                        name="projectType"
                        value={values.projectType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
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
                        value={values.projectType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: "block" }}
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
                              onChange={options =>
                                this.setState({ countriesSelected: options })
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
                                      <select
                                        name="activity"
                                        value={values.projectType}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ display: "block" }}
                                      >
                                        {numberOfParticipants.map(num => (
                                          <option
                                            value={num.value}
                                            label={num.label}
                                          />
                                        ))}
                                      </select>
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
                          onChange={() =>
                            this.setState({ locationSelected: false })
                          }
                          className={
                            locationSelected
                              ? "project-window__location-selected project-window__location-search"
                              : "project-window__location-search"
                          }
                          inputClassName="project-window__location-search-input"
                          placeholder="Search for location of the project"
                          onSuggestSelect={location => {
                            values.location.position =
                              location && location.location;
                            values.location.address =
                              location && location.gmaps.formatted_address;

                            this.onLocationSelect(location);
                          }}
                        />
                      </div>
                      <p className="project-window__location-address">
                        {address}
                      </p>
                    </div>

                    <LocationPicker
                      containerElement={
                        <div style={{ height: "100%", width: "60%" }} />
                      }
                      mapElement={
                        <div style={{ height: "400px", width: "auto" }} />
                      }
                      defaultPosition={this.state.location.position}
                    />
                  </div>

                  <ButtonStyled
                    type="submit"
                    disabled={loading}
                    btnColor={props => props.theme.blue}
                  >
                    {" "}
                    Publish Project{" "}
                  </ButtonStyled>
                </Form>
              </FormWrapper>
            )}
          </Formik>
        )}
      </Mutation>
    );
  }
}

export default CreateProject;
export { CREATE_PROJECT_MUTATION };
