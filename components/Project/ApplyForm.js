import React, { useRef, useState } from 'react';
import { Mutation } from 'react-apollo';
import { APPLY_FOR_PROJECT_MUTATION } from '../../lib/mutations';

import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  FormLabel,
} from '@material-ui/core';

import Error from '../styles/ErrorMessage';

const getKeyFromObject = (obj) => {
  const keys = Object.keys(obj);

  const filtered = keys.filter(function (key) {
    return obj[key];
  });

  return filtered;
};

const ApplyForm = ({ projectId, formDisplay, formRef }) => {
  const [motivation, setMotivation] = useState('');
  const [reason, setReason] = useState('');
  const [afterProject, setAfterProject] = useState('');
  const [foodPreference, setFoodPreference] = useState({
    Vegetarian: false,
    Vegan: false,
    GlutenFree: false,
    None: false,
  });

  const handleChange = (event) => {
    setFoodPreference({ ...foodPreference, [event.target.name]: event.target.checked });
  };

  const foodProccesed = getKeyFromObject(foodPreference);

  const { Vegetarian, Vegan, GlutenFree, None } = foodPreference;
  const errorFoodPreference = [Vegetarian, Vegan, GlutenFree, None].filter((v) => v).length > 2;

  return (
    <Mutation
      mutation={APPLY_FOR_PROJECT_MUTATION}
      variables={{
        motivation,
        reason,
        afterProject,
        foodPreference: foodProccesed,
        projectId,
      }}
    >
      {(applyForProject, { error, loading }) => (
        <div className={`form-wrapper ${formDisplay && 'form-wrapper__dispalyed'}`}>
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
              </FormControl>
              <FormLabel component="legend">* Pick one or two</FormLabel>
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
            />
            <TextField
              className="textarea-input"
              id="filled-multiline-flexible"
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
  );
};

export default ApplyForm;
