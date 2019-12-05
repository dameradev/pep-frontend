import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { Form, Formik, Field } from 'formik';
import Select from "react-select"
import Router from "next/router";

import Geosuggest from "react-geosuggest";
// import Form from "../../styles/Form";
import Error from "../../ErrorMessage";



const options = [{value: "ESC", label: "ESC"}, {value: "Training_Course", label: "Training_Course"}, {value: "Youth_Exchange", label: "Youth_Exchange"}]

const GET_ALL_COUNTRIES_QUERY = gql`
  query GET_ALL_COUNTRIES_QUERY {
    getCountries{
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
    $date: Date,
    $location: String!
    $costs: String!
    $countries: [String!]!
    
  ) {
    createProject(
      title: $title
      description: $description
      projectType: $projectType
      objectives: $objectives
      date: $date,
      location: $location
      costs: $costs,
      countries: $countries
    ) {
      id
    }
  }
`;

class CreateProject extends Component {
  state = {
    location: {
      address: "Rue de la Loi 41, 1000 Bruxelles, Belgium",
      position: {
        lat: 50.8,
        lng: 3.9
      }
    },
    locationSelected: false
  }
  componentDidMount () {
    console.log(window)
  }
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
    
    return (
      <Mutation mutation={CREATE_PROJECT_MUTATION}>
      {(createProject,{loading}) => (
  
          <Formik
              initialValues={{ title: '',  description: '', projectType: 'ESC', countries: []}}
              onSubmit={ async (values, actions) => {
                const {title, description, projectType, countries} = values;
                console.log(values);
                let newCountries = countries.map(country => country.label)
                console.log(newCountries)
                createProject({variables: {title, description, projectType, countries: newCountries}})
                  // You can access the signup mutation in here now
                  // You can access values.name, values.email, values.password
                  // You can access actions, e.g. actions.setSubmitting(false) once you've finished the mutation
              }}
  
  
              render={({handleChange, handleSubmit, handleBlur, values}) => (
                  
                  <Form onSubmit={handleSubmit}>
                      <Field 
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.title} 
                          name="title" 
                          placeholder="Name" 
                      />
                      
                      <Field 
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description} 
                          name="description" 
                          placeholder="Password" 
                      />
                      <Select options={options} placeholder="Please select the type of project"/>

                      {/* <select
                        name="projectType"
                        value={values.projectType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ display: 'block' }}
                      >
                        {options.map(option => (
                          <option value={option.value} label={option.label} />
                        ))}
                      </select> */}

                      <Query query={GET_ALL_COUNTRIES_QUERY}>
                          {({data}) => {
                           const options = [];
                           data.getCountries.forEach(country => {
                            options.push({label: country.name, value: country.name})
                           })

                            return <Select options={options} isMulti isSearchable onChange={option=> {values.countries.push(option[option.length - 1])}} value={values.countries} />
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
                      
                              inputClassName="project-window__location-search-input"
                              placeholder="Search for location of the project"
                            //   onSuggestSelect={location => {
                                
                            //     values.location.position = location.location;
                            //     values.location.address = location.gmaps.formatted_address;
                            //     this.onLocationSelect(location);
                            //   }}
                            />
                          </div>
                          <p className="project-window__location-address">
                            {/* {address} */}
                          </p>
                        </div>

              
                      </div>

                      <button type="submit" disabled={loading}> Sign Up </button>
                  </Form>
              )}
          />
      )}
  </Mutation>
      
    );
  }
}

export default CreateProject;
export { CREATE_PROJECT_MUTATION };
