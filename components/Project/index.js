import React, { useState, useRef, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Query, useMutation, useQuery } from 'react-apollo';

import SingleProject from '../Projects/SingleProject';
import Applicants from './Applicants';
import UserContext from '../../contexts/userContext';
import ApplyForm from './ApplyForm';

import { ProjectStyles } from './styles';

import { SINGLE_PROJECT_QUERY } from '../../lib/queries';
import { UPDATE_APPLICANT_FORM_MUTATION } from '../../lib/mutations';
import OrganizationInfo from './organizationInfo';
import { Icon, TextField } from '@material-ui/core';

const Project = (props) => {
  const {
    query: { id, apply },
  } = props;

  const [formDisplay, setFormDisplay] = useState(false);
  const [edit, setEdit] = useState(false);

  const { loading, data: { project } = {} } = useQuery(SINGLE_PROJECT_QUERY, { variables: { id } });
  const { user: { id: userId, organizationProfile, name, email } = {}, applicants, applicantForm } =
    project || {};

  const [questions, setQuestions] = useState(applicantForm?.questions);

  console.log(questions);
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

  const handleFormDisplay = () => {
    setFormDisplay(true);
    setTimeout(() => {
      window.scrollTo(0, formRef?.current?.offsetTop - 40);
    }, 100);
  };

  console.log(applicantForm);
  const [updateApplicantForm, { data, loading: formLoading }] = useMutation(
    UPDATE_APPLICANT_FORM_MUTATION,
    {
      variables: {
        id: applicantForm?.id,
        questions: questions,
      },
    }
  );

  useEffect(() => {
    if (apply === 'true') {
      handleFormDisplay();
    }
    if (questions === undefined) {
      setQuestions(applicantForm?.questions);
    }
  });

  const user = useContext(UserContext);
  const formRef = useRef(null);

  return project ? (
    <ProjectStyles>
      <div className="top">
        <SingleProject
          className="project__details"
          project={project}
          userId={user?.id}
          handleFormDisplay={handleFormDisplay}
        />
        <OrganizationInfo
          name={name}
          email={email}
          userId={userId}
          organizationProfile={organizationProfile}
        />
      </div>
      {user?.id !== userId ? (
        <ApplyForm projectId={id} formDisplay={formDisplay} formRef={formRef} />
      ) : applicants.length ? (
        <Applicants applicants={applicants} projectId={id} />
      ) : (
        'There are currently no  applicants for this project'
      )}

      {user?.id === userId && (
        <div>
          <h3>Applicant form configuration</h3>

          <div>
            <p>Food preference options</p>
            <ul>
              <li>Vegan</li>
              <li>Vegetarian</li>
              <li>Gluten free</li>
              <li>none</li>
            </ul>
          </div>
          <div>
            Questions
            <ul>
              {questions?.length ? (
                questions?.map((item, index) => (
                  <li>
                    {edit === 'false' ? (
                      <p>{item}</p>
                    ) : (
                      <div className="form__group">
                        <TextField
                          className="form__input"
                          type="text"
                          onChange={(e) => handleArrayChange(e, index, questions)}
                          value={item}
                          name="question"
                          placeholder="Enter focused on item"
                          variant="outlined"
                        />

                        <Icon onClick={() => removeArrayElement(index)} color="primary">
                          remove_circle
                        </Icon>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <p>Please add a what you're focused on by clicking on the plus icon below.</p>
              )}
            </ul>
            {edit !== 'false' && (
              <Icon onClick={() => addArrayElement('focusedOn')} color="primary">
                add_circle
              </Icon>
            )}
          </div>
          <button onClick={() => updateApplicantForm()}>Save changes</button>
        </div>
      )}
    </ProjectStyles>
  ) : (
    <ProjectStyles>
      <div className="skeleton">
        <Skeleton height={700} className="project-skeleton" />
        <Skeleton height={700} className="organization-skeleton" />
      </div>
    </ProjectStyles>
  );
  //   }}
  // </Query>
  // );
};

export default Project;
