import React, { useState, useRef, useEffect } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { respondTo } from '../../lib/respondTo';

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

import { SINGLE_PROJECT_QUERY } from '../../lib/queries';

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
    gap: 3rem;
    ${respondTo.tabletMini` 
      flex-direction:column-reverse;
      
    `}
  }
  .project {
    &__details {
      width: 100%;
      height: max-content;
      ${respondTo.tabletMini` 
        margin: 2rem 5%;
        width: auto;
      `}
    }
    &__organization {
      width: 50rem;
      border-radius: 5px;
      background: #fff;
      box-shadow: 0px 3px 6px #00000029;

      color: ${(props) => props.theme.darkGrey1};
      height: max-content;
      ${respondTo.tabletMini` 
        width: 100%;
        border-radius: 0;

      `}

      .header {
        padding: 4rem 2rem 1rem 2rem;
        text-align: center;
        img {
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 50%;
          width: 15rem;
          height: 15rem;
          object-fit: cover;
        }
        h2 {
          font-weight: 200;
          font-size: 2.4rem;
        }
        p {
          font-size: 1.6rem;
        }
      }
      .contact {
        padding: 4rem 3rem;
        h3 {
          text-transform: uppercase;
          font-weight: 300;
          position: relative;
          &::after {
            content: '';
            background: ${(props) => props.theme.red};
            position: absolute;
            bottom: 0;
            left: 0;
            height: 0.5rem;
            width: 3rem;
          }
        }
        p {
          font-style: italic;
        }
        & > div {
          padding: 1rem 0;
        }
      }
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
          padding: 1rem 3.5rem;
          font-size: 1.6rem;
          outline: none;
          border: none;
          color: #fff;
          cursor: pointer;

          ${respondTo.tabletMini` 

            border-radius: 0;
          `};
          background: ${(props) => props.theme.red};
          &:not(:first-of-type) {
            background: ${(props) => props.theme.blue};
            /* border-bottom-left-radius: 0;
            border-bottom-right-radius: 5px;
            ${respondTo.tabletMini`   
              border-radius: 0;
            `}; */
          }
        }
      }
    }
  }
  .form-wrapper {
    display: flex;
    gap: 3rem;
  }

  .placeholder {
    width: 50rem;
    ${respondTo.tabletMini` 
        display: none;
      `}
  }

  .applicant {
    box-shadow: 0px 3px 6px #00000029;
    padding: 2rem;
    margin-bottom: 1rem;
    background: #fff;
  }
  .application-form {
    padding: 3rem;
    width: 100%;
    box-shadow: 0px 3px 6px #00000029;

    border-radius: 5px;
    background: #fff;
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
        const { user: { organizationProfile, name, email } = {}, applicants } = project || {};
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
                <div className="header">
                  <img src="https://www.logogenie.net/download/preview/medium/5319421" />
                  <h2>{project.user?.name}</h2>
                  <p className="slogan">{project.user.organizationProfile?.slogan}</p>
                </div>
                <div className="buttons-container">
                  <button>Our Projects</button>
                  <button>View Profile</button>
                </div>
                <div className="contact">
                  <div className="contact__responsible-person">
                    <h3>Responsible person</h3>
                    <p>{organizationProfile.responsiblePerson}</p>
                  </div>
                  <div className="contact__email">
                    <h3>Email</h3>
                    <p>{email}</p>
                  </div>
                  <div className="contact__phone">
                    <h3>Phone</h3>
                    <p>{organizationProfile.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            {false && (
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
                  <div className="form-wrapper">
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
                        rows={5}
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
                        rows={5}
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
                        rows={5}
                        rowsMax={10}
                        value={afterProject}
                        onChange={(e) => setAfterProject(e.target.value)}
                      />

                      <Button type="submit" variant="outlined" color="primary">
                        Submit Application
                      </Button>
                    </form>
                    <div className="placeholder">&nbsp;</div>
                  </div>
                )}
              </Mutation>
            )}
            <div>
              <h2>Applicants for project</h2>
              <ul>
                {applicants.length &&
                  applicants.map(
                    ({
                      motivation,
                      reason,
                      foodPreference,
                      status,
                      afterProject,
                      applicant: { name, nationality } = {},
                    }) => (
                      <li className="applicant">
                        <h3>Name</h3>
                        <p>{name}</p>
                        <h3>Nationality</h3>
                        <p>{nationality}</p>
                        <h3>Motivation</h3>
                        <p>{motivation}</p>
                        <h3>Status</h3>
                        <p>{status}</p>
                        <h3>Motivation</h3>
                        <p>{motivation}</p>
                        <h3>Reason</h3>
                        <p>{reason}</p>
                        <h3>After project</h3>
                        <p>{afterProject}</p>
                        <h3>Food preference</h3>
                        {foodPreference.map((foodItem) => (
                          <p>{foodItem}</p>
                        ))}
                      </li>
                    )
                  )}
              </ul>
            </div>
          </ProjectStyles>
        ) : (
          'Loading..'
        );
      }}
    </Query>
  );
};

export default Project;
