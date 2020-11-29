import React, { useState } from 'react';
import { ApplicationFormConfigStyles } from './styles';
import { Icon, TextField } from '@material-ui/core';
import { useMutation } from 'react-apollo';
import { SET_POPUP_MUTAITON, UPDATE_APPLICANT_FORM_MUTATION } from '../../lib/mutations';

const FormConfig = ({ questions: questionsProps, applicantFormId, handleFormDisplay, formRef }) => {
  const [questions, setQuestions] = useState(questionsProps);

  const addArrayElement = (name) => {
    let newArray = questions;
    newArray = [...newArray];
    newArray.push('');

    setQuestions(newArray);
  };

  const removeArrayElement = (index) => {
    let newArray = questions;
    newArray = [...newArray];
    newArray.splice(index, 1);

    setQuestions(newArray);
  };

  const handleArrayChange = (e, index, array) => {
    const newArray = [...array];
    newArray[index] = e.target.value;

    setQuestions(newArray);
  };

  const [updateApplicantForm, { data, loading: formLoading }] = useMutation(
    UPDATE_APPLICANT_FORM_MUTATION,
    {
      variables: {
        id: applicantFormId,
        questions: questions,
      },
    }
  );

  const [setPopup, { popupData }] = useMutation(SET_POPUP_MUTAITON, {
    variables: {
      isPopupOpen: true,
      title: 'Form Saved',
      messages: [
        "Applicant form questions saved, please keep in mind that after first application from any participant, you won't be able to add or remove any questions",
      ],
    },
  });

  return (
    <ApplicationFormConfigStyles ref={formRef}>
      <h2>Applicant form configuration</h2>

      <div className="food-preference">
        <h3>Food preference options</h3>
        <ul>
          <li>Vegan</li>
          <li>Vegetarian</li>
          <li>Gluten free</li>
          <li>None</li>
        </ul>
        <p>(Note: These are not customizable)</p>
      </div>
      <div className="questions">
        <h3>Questions</h3>
        <ul>
          {questions?.length &&
            questions?.map((item, index) => (
              <li>
                <div className="form__group">
                  <TextField
                    className="form__input"
                    type="text"
                    onChange={(e) => handleArrayChange(e, index, questions)}
                    value={item}
                    name="question"
                    placeholder="Enter new question"
                    variant="standard"
                  />

                  <Icon onClick={() => removeArrayElement(index)} color="primary">
                    remove_circle
                  </Icon>
                </div>
              </li>
            ))}
        </ul>

        <Icon className="add-button" onClick={() => addArrayElement()} color="primary">
          add_circle
        </Icon>
      </div>
      <div className="buttons-container">
        <button className="button button-view" onClick={() => handleFormDisplay()}>
          View form
        </button>
        <button
          className="button"
          onClick={() => {
            updateApplicantForm();
            setPopup();
          }}
        >
          Save changes
        </button>
      </div>
    </ApplicationFormConfigStyles>
  );
};

export default FormConfig;
