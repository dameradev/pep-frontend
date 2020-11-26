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

import FormConfig from './FormConfig';

const Project = (props) => {
  const {
    query: { id, apply },
  } = props;

  const [formDisplay, setFormDisplay] = useState(false);
  const [edit, setEdit] = useState(false);

  const { loading, data: { project } = {} } = useQuery(SINGLE_PROJECT_QUERY, { variables: { id } });
  const { user: { id: userId, organizationProfile, name, email } = {}, applicants, applicantForm } =
    project || {};

  const handleFormDisplay = () => {
    setFormDisplay(true);
    setTimeout(() => {
      window.scrollTo(0, formRef?.current?.offsetTop - 70);
    }, 100);
  };

  // const handleFormDisplay = () => {

  // }

  useEffect(() => {
    if (apply === 'true') {
      handleFormDisplay();
    }
  });

  const user = useContext(UserContext);
  const formRef = useRef(null);
  const configFormRef = useRef(null);

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
          configFormRef={configFormRef}
        />
      </div>
      {/* {user?.id !== userId ? (
        <ApplyForm projectId={id} formDisplay={formDisplay} formRef={formRef} />
      ) : */}
      {user?.id === userId && applicants.length ? (
        <Applicants applicants={applicants} projectId={id} questions={applicantForm?.questions} />
      ) : (
        user?.id === userId && (
          <h3 className="no-applicants-message">
            There are currently no applicants for this project
          </h3>
        )
      )}

      {user?.id === userId && (
        <FormConfig
          formRef={configFormRef}
          questions={applicantForm?.questions}
          applicantFormId={applicantForm?.id}
          handleFormDisplay={handleFormDisplay}
        />
      )}

      <ApplyForm
        projectId={id}
        formDisplay={formDisplay}
        formRef={formRef}
        applicantForm={applicantForm}
      />
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
