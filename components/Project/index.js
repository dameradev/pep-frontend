import React, { useState, useRef, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Query } from 'react-apollo';

import SingleProject from '../Projects/SingleProject';
import Applicants from './Applicants';
import UserContext from '../../lib/auth';
import ApplyForm from './ApplyForm';

import { ProjectStyles } from './styles';

import { SINGLE_PROJECT_QUERY } from '../../lib/queries';
import OrganizationInfo from './organizationInfo';

const Project = (props) => {
  const [formDisplay, setFormDisplay] = useState(false);

  const handleFormDisplay = () => {
    setFormDisplay(true);
    console.log(formRef.current);
    window.scrollTo(0, formRef?.current?.offsetTop);
  };

  const {
    query: { id, apply },
  } = props;

  useEffect(() => {
    if (apply === 'true') {
      handleFormDisplay();
    }
  });

  const user = useContext(UserContext);
  const formRef = useRef(null);

  return (
    <Query query={SINGLE_PROJECT_QUERY} variables={{ id: id }}>
      {({ data: { project } = {}, error, loading }) => {
        const { user: { id: userId, organizationProfile, name, email } = {}, applicants } =
          project || {};

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
          </ProjectStyles>
        ) : (
          <ProjectStyles>
            <div className="skeleton">
              <Skeleton height={700} className="project-skeleton" />
              <Skeleton height={700} className="organization-skeleton" />
            </div>
          </ProjectStyles>
        );
      }}
    </Query>
  );
};

export default Project;
