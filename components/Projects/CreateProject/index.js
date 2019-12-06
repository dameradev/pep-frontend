import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { Form, Formik, Field } from "formik";
import Select from "react-select";
import Router from "next/router";

import Geosuggest from "react-geosuggest";
// import Form from "../../styles/Form";
import styled from "styled-components";
import Error from "../../ErrorMessage";

import { ButtonStyled } from "../../../pages/index";

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
    $countries: [String!]!
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
    this.setState({ position, address });
  }

  render() {
    const { countriesSelected } = this.state;
    return (
      <Mutation mutation={CREATE_PROJECT_MUTATION}>
        {(createProject, { loading }) => (
          <Formik
            initialValues={{
              title: "",
              description: "",
              projectType: "ESC",
              countries: []
            }}
            onSubmit={async (values, actions) => {
              const { title, description, projectType, countries } = values;
              console.log(countries);
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
            render={({ handleChange, handleSubmit, handleBlur, values }) => (
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
                                      <select>
                                        <option value="0" label="0" />
                                      </select>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </CountriesStyled>
                      );

                      // return <Select options={options} isMulti isSearchable onChange={option=> {values.countries.push(option[option.length - 1])}} value={values.countries} />

                      // return (
                      //   <select
                      //   name="countries"
                      //   value={values.countries}
                      //   onChange={handleChange}
                      //   onBlur={handleBlur}
                      //   style={{ display: 'block' }}
                      // >
                      //   {options.map(option => (
                      //     <option value={option.value} label={option.label} />
                      //   ))}
                      // </select>
                      // )
                    }}
                  </Query>

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
          />
        )}
      </Mutation>
    );
  }
}

export default CreateProject;
export { CREATE_PROJECT_MUTATION };
