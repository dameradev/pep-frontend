import React, { useState, useRef, useEffect } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { respondTo } from '../../utils/respondTo';

import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@material-ui/core';

import Error from '../styles/ErrorMessage';
import SingleProject from '../Projects/SingleProject';

const SINGLE_PROJECT_QUERY = gql`
  query SINGLE_PROJECT_QUERY($id: Int!) {
    project(id: $id) {
      title
      description
      costs
      totalNumberOfParticipants
      projectType
      activity
      startDate
      endDate
      savedProjectUserIds
      nations {
        name
        numberOfParticipants
      }
      location {
        address
      }
      user {
        name
        email
      }
      # participants {
      #   name
      # }
    }
  }
`;

const APPLY_FOR_PROJECT_MUTATION = gql`
  mutation APPLY_FOR_PROJECT_MUTATION(
    $motivation: String!
    $reason: String!
    $afterProject: String!
    $foodPreference: [FoodPreference]!
    $projectId: ID!
  ) {
    applyForProject(
      motivation: $motivation
      reason: $reason
      afterProject: $afterProject
      foodPreference: $foodPreference
      projectId: $projectId
    ) {
      id
    }
  }
`;

const ProjectStyles = styled.div`
  /* margin: 2rem 10%; */
  padding: 2rem 5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${respondTo.tabletMini` 
    padding: 0;
  `}

  .top {
    display: flex;
    gap: 2rem;
    ${respondTo.tabletMini` 
      flex-direction:column-reverse;
      
    `}
  }
  .project {
    &__details {
      width: 100%;
      ${respondTo.tabletMini` 
        margin: 2rem 5%;
        width: auto;
      `}
    }
    &__organization {
      max-width: 40rem;
      border-radius: 5px;
      background: #fff;
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
      border: 1px solid ${(props) => props.theme.borderColorPrimary};
      color: ${(props) => props.theme.darkGrey1};
      height: max-content;
      ${respondTo.tabletMini` 
        max-width: 100%;
        border-radius: 0;
        text-align: center;
      `}

      & > * {
        padding: 0 3rem;
      }

      .description {
        font-size: 1.4rem;
        margin: 1rem 0;
      }

      .buttons-container {
        margin-top: 2rem;
        width: 100%;
        padding: 0;

        button {
          width: 50%;
          padding: 2rem 3.5rem;
          font-size: 2rem;
          outline: none;
          border: none;
          color: #fff;
          cursor: pointer;
          border-bottom-left-radius: 5px;

          ${respondTo.tabletMini` 

            border-radius: 0;
          `};
          background: ${(props) => props.theme.blue};
          &:not(:first-of-type) {
            background: ${(props) => props.theme.red};
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 5px;
            ${respondTo.tabletMini`   
              border-radius: 0;
            `};
          }
        }
      }
    }
  }

  .application-form {
    padding: 3rem;

    border-radius: 5px;
    background: #fff;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
    border: 1px solid ${(props) => props.theme.borderColorPrimary};
    color: ${(props) => props.theme.darkGrey1};

    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    ${respondTo.tabletMini` 
      margin: 2rem 5%;
      width: auto;
    `}

    h2 {
      padding-bottom: 1.8rem;
      color: ${(props) => props.theme.blue};
      font-weight: bold;
    }

    h3 {
      font-weight: 300;
    }

    .textarea-input {
      width: 100%;
      padding-bottom: 3rem;
    }
    .error {
      color: red;
      font-size: 1.2rem;
    }

    &__diet {
      margin-bottom: 2rem;
    }

    &__food-preference {
      display: flex;
      flex-direction: row;
    }
  }

  .display-application-form {
    opacity: 1;
  }
`;

const getKeyFromObject = (obj) => {
  const keys = Object.keys(obj);

  const filtered = keys.filter(function (key) {
    return obj[key];
  });

  return filtered;
};

const Project = (props) => {
  const [formDisplay, setFormDisplay] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [reason, setReason] = useState('');
  const [afterProject, setAfterProject] = useState('');
  const [foodPreference, setFoodPreference] = useState({
    Vegetarian: false,
    Vegan: false,
    GlutenFree: false,
    None: false,
  });
  const handleFormDisplay = () => {
    setFormDisplay(true);
    window.scrollTo(0, formRef?.current?.offsetTop);
  };

  const handleChange = (event) => {
    setFoodPreference({ ...foodPreference, [event.target.name]: event.target.checked });
  };
  const {
    query: { id, apply },
  } = props;

  useEffect(() => {
    if (apply === 'true') {
      handleFormDisplay();
    }
  });
  const { Vegetarian, Vegan, GlutenFree, None } = foodPreference;
  const errorFoodPreference = [Vegetarian, Vegan, GlutenFree, None].filter((v) => v).length > 2;

  const formRef = useRef(null);

  const foodProccesed = getKeyFromObject(foodPreference);

  console.log(foodProccesed);

  return (
    <Query query={SINGLE_PROJECT_QUERY} variables={{ id: id }}>
      {({ data: { project } = {}, error, loading }) => {
        return project ? (
          <ProjectStyles>
            <div className="top">
              <SingleProject
                className="project__details"
                project={project}
                userId={1}
                handleFormDisplay={handleFormDisplay}
              />
              <div className="project__organization">
                <h1>{project.user?.name}</h1>
                <p className="description">
                  yEUth is seated in the beautiful city of Leiden, a city full of young people and
                  students which is actually the target group of our work: Youth Empowerment.
                </p>
                <p>Contact Person: Dame Radev</p>
                <p>{project.user?.email}</p>

                <div className="buttons-container">
                  <button>Our Projects</button>
                  <button>View Profile</button>
                </div>
              </div>
            </div>
            <Mutation
              mutation={APPLY_FOR_PROJECT_MUTATION}
              variables={{
                motivation,
                reason,
                afterProject,
                foodPreference: foodProccesed,
                projectId: id,
              }}
            >
              {(applyForProject, { error, loading }) => (
                <form
                  ref={formRef}
                  id="application-form"
                  className={`application-form ${formDisplay && 'display-application-form'}`}
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const res = await applyForProject();
                    if (res.data?.applyForProject?.id) {
                    }
                  }}
                >
                  <h2> Please fill out the form in order to apply for this project </h2>
                  {error && <Error error={error} />}

                  <div className="application-form__diet">
                    <FormControl required error={error} component="fieldset">
                      {errorFoodPreference && (
                        <p className="error">2 options is the most you can select</p>
                      )}
                      <label>Food preference</label>
                      <FormGroup className="application-form__food-preference">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Vegetarian}
                              onChange={handleChange}
                              name="Vegetarian"
                              color="primary"
                            />
                          }
                          label="Vegetarian"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={Vegan}
                              onChange={handleChange}
                              name="Vegan"
                              color="primary"
                            />
                          }
                          label="Vegan"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={GlutenFree}
                              onChange={handleChange}
                              name="GlutenFree"
                              color="primary"
                            />
                          }
                          label="Gluten free"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={None}
                              onChange={handleChange}
                              name="None"
                              color="primary"
                            />
                          }
                          label="None"
                        />
                      </FormGroup>

                      {/* <FormHelperText>You can display an error</FormHelperText> */}
                    </FormControl>
                    <FormLabel component="legend">* Pick one or two</FormLabel>
                    {/* <Checkbox
                      // checked={checked}
                      // onChange={handleChange}
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> */}
                  </div>
                  <TextField
                    className="textarea-input"
                    id="filled-multiline-flexible"
                    label="What's your main motivation for this project"
                    placeholder="What's your main motivation for this project"
                    multiline
                    rowsMax={10}
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    // variant="outlined"
                  />

                  <TextField
                    className="textarea-input"
                    id="filled-multiline-flexible"
                    // label="Project expectations"
                    placeholder="Briefly explain why you want to participate and what skills you bring to the project"
                    label="Briefly explain why you want to participate and what skills you bring to the project"
                    multiline
                    rowsMax={10}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    // variant="outlined"
                  />
                  <TextField
                    className="textarea-input"
                    id="filled-multiline-flexible"
                    // label="Project expectations"
                    placeholder="In which way you will implement the skills that you will learn in your everyday life and your society as well "
                    label="In which way you will implement the skills that you will learn in your everyday life and your society as well "
                    multiline
                    rowsMax={10}
                    value={afterProject}
                    onChange={(e) => setAfterProject(e.target.value)}
                    // variant="outlined"
                  />
                  {/* <label htmlFor="motivation">
                      <h3>Motivation letter</h3>
                      <textarea
                        type="motivation"
                        name="motivation"
                        id="motivation"
                        placeholder="Enter here what motivaties you to join this project"
                        // onChange={this.handleChange}
                      >
                        {motivation}
                      </textarea> */}
                  {/* </label> */}
                  {/* <label htmlFor="expectations">
                      <h3>Project expectations</h3>
                      <textarea
                        type="expectations"
                        name="expectations"
                        id="expectations"
                        placeholder="What do you expect to gain from this project"
                        // onChange={this.handleChange}
                      >
                        {expectations}
                      </textarea>
                    </label> */}
                  <Button type="submit" variant="outlined" color="primary">
                    Submit Application
                  </Button>
                </form>
              )}
            </Mutation>
          </ProjectStyles>
        ) : (
          'Loading..'
        );
      }}
    </Query>
  );
};

export default Project;
