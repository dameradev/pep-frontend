import React, { Component, useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { Query, Mutation, useLazyQuery, useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Icons from '../../utils/icons';

import { Box, Typography, TextField, Icon } from '@material-ui/core';
// import { Icon } from '@material-ui/icons';

import { OrganizationStyles } from './styles';

import OrganizationHeader from './OrganizationHeader';
import OrganizationSidebar from './OrganizationSidebar';
import SimilarOrganizations from './SimilarOrganizations';

import SingleProject from '../Projects/SingleProject';

import { respondTo } from '../../utils/respondTo';

const ApplicantStyles = styled.li`
  /* border: 1px solid gray; */
  padding: 1rem;
  margin: 1rem 0;
  /* width: 50rem; */

  .applicant-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: ${({ status }) =>
        status === 'ACCEPTED' ? 'green' : status === 'REJECTED' ? 'red' : 'orange'};
    }
  }
  .applicant-footer {
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    img {
      width: 12rem;
    }
    .read-more {
      text-align: right;
      color: ${(props) => props.theme.blue};
    }
  }
`;

const ParticipantStyles = styled.li`
  padding: 1rem;
  margin: 1rem 0;
`;

const ParticipatingCountires = styled.ul`
  margin: 1.5rem 0;
  padding: 20px;
  /* border: 1px solid #ccc; */
  width: fit-content;

  .participating-countries {
    &__title {
      color: ${(props) => props.theme.blue};
      font-size: 1.5rem;
      padding-bottom: 1rem;
    }

    &__country {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 250px;
      font-size: 1.3rem;
      /* vertical-align: center; */
      span {
        margin-right: 1rem;
        margin-top: 5px;

        svg {
          border: 0.3px solid ${(props) => props.theme.borderColorPrimary};
          width: 40px;
        }
      }
    }
  }
`;

const countriesList = (data) => {
  return (
    data &&
    data.map(({ name, numberOfParticipants }) => (
      <li>
        <p className="participating-countries__country">
          <span>{Icons[name.split(' ')[0]]}</span>
          {name}: {numberOfParticipants} participants
        </p>
      </li>
    ))
  );
};

const SectionStyled = styled.section`
  height: fit-content;

  padding: 2rem;
  border-radius: 5px;
  margin-bottom: 2rem;

  background: ${(props) => props.focusedOn && '#F7F7F7'};
  margin: ${(props) => props.focusedOn && '0 -4rem'};
  padding: ${(props) => props.focusedOn && '2rem 6rem'};

  h3 {
    padding-bottom: 1rem;
    margin-bottom: 2rem;

    font-weight: 500;
    font-size: 4rem;
    color: #585858;
    position: relative;
    z-index: 1;
    display: inline-block;
    &::before {
      content: '-';
      position: absolute;
      left: -3rem;
      ${respondTo.tabletMini`   
      left: 0;
    `}
    }
    &::after {
      content: '';
      background: ${(props) => props.theme.red};
      position: absolute;
      bottom: 2.2rem;
      z-index: -1;
      right: -1rem;
      height: 2rem;
      width: 10rem;
      opacity: 0.8;
    }
    ${respondTo.tabletMini`   
      padding:0 3rem;
    `}
  }
  p {
    color: #95989d;
  }

  ${respondTo.tabletMini`   
      background: #fff;
      margin: 0 -3rem;
      padding: 3rem 4rem;
      border-radius:0;
      background: ${(props) => props.focusedOn && '#F7F7F7'};
  `}
`;

const usePrevious = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const UPDATE_ORGANIZATION = gql`
  mutation updateOrganization(
    $id: Int
    $name: String
    $slogan: String
    $summary: String
    $responsiblePerson: String
    $phoneNumber: String
    $website: String
    $focusedOn: [String]
  ) {
    updateOrganization(
      id: $id
      name: $name
      slogan: $slogan
      summary: $summary
      responsiblePerson: $responsiblePerson
      phoneNumber: $phoneNumber
      website: $website
      focusedOn: $focusedOn
    ) {
      organizationProfile {
        id
        summary
      }
    }
  }
`;

const PROJECTS_BY_ORGANIZATION = gql`
  query projectsByOrganization($organizationId: Int) {
    projectsByOrganization(organizationId: $organizationId) {
      id
      title
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
    }
  }
`;

const Organization = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [summary, setSummary] = useState('');
  const [responsiblePerson, setResponsiblePerson] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [focusedOn, setFocusedOn] = useState('');
  const [interestedIn, setInterestedIn] = useState('');

  const [updateOrganization] = useMutation(UPDATE_ORGANIZATION);

  const handleTabChange = (event, value) => {
    setTabValue(value);
  };

  const { loading, error, data } = useQuery(PROJECTS_BY_ORGANIZATION, {
    variables: { id: props.organization?.id },
  });

  // console.log(data, 'projects');
  const { id, path, edit } = props;

  useEffect(() => {
    if (props.organization) {
      if (!responsiblePerson)
        setResponsiblePerson(props.organization.organizationProfile.responsiblePerson);
      if (!phoneNumber) setPhoneNumber(props.organization.organizationProfile.phoneNumber);
      if (!website) setWebsite(props.organization.organizationProfile.website);
      if (!slogan) setSlogan(props.organization.organizationProfile.slogan);
      if (!name) setName(props.organization.name);
      if (!summary) setSummary(props.organization.organizationProfile.summary);
      if (!focusedOn) setFocusedOn(props.organization.organizationProfile.focusedOn);
    }
  });

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'slogan':
        setSlogan(e.target.value);
        break;
      case 'summary':
        setSummary(e.target.value);
        break;
      case 'responsiblePerson':
        setResponsiblePerson(e.target.value);
        break;
      case 'phoneNumber':
        setPhoneNumber(e.target.value);
        break;
      case 'website':
        setWebsite(e.target.value);
        break;
    }
  };

  const handleArrayChange = (e, index, array) => {
    const newArray = [...array];
    newArray[index] = e.target.value;

    switch (e.target.name) {
      case 'focusedOn':
        setFocusedOn(newArray);
        break;
    }
  };

  const addArrayElement = (name) => {
    let newArray = name === 'focusedOn' ? focusedOn : interestedIn;
    newArray = [...newArray];
    newArray.push('');

    if (name === 'focusedOn') {
      setFocusedOn(newArray);
    } else {
      setInterestedIn(newArray);
    }
  };

  const removeArrayElement = (name, index) => {
    let newArray = name === 'focusedOn' ? focusedOn : interestedIn;
    newArray = [...newArray];
    newArray.splice(index, 1);

    if (name === 'focusedOn') {
      setFocusedOn(newArray);
    } else {
      setInterestedIn(newArray);
    }
  };

  console.log(props, 'props');

  return (
    <OrganizationStyles>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(id);
          updateOrganization({
            variables: {
              id,
              name,
              slogan,
              summary,
              responsiblePerson,
              phoneNumber,
              website,
              focusedOn,
            },
          });

          Router.push({
            pathname: '/organization',
            query: { id, edit: false },
          });
        }}
      >
        <OrganizationHeader
          className="organization__header"
          id={props.organization?.id}
          name={name}
          email={props.organization?.email}
          slogan={slogan}
          edit={edit}
          className="organization__header"
          handleTabChange={handleTabChange}
          handleChange={handleChange}
          value={tabValue}
        />
        <section className="organization__main">
          <TabPanel className="tab organization__info" value={tabValue} index={0}>
            <SectionStyled>
              <h3>Summary</h3>
              {edit === 'false' ? (
                <p>{summary ? summary : 'Edit your page to enter summary'}</p>
              ) : (
                <TextField
                  className="form__input organization__summary"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={summary}
                  name="summary"
                  placeholder="Describe what your organization is about"
                  multiline
                  rows={8}
                  variant="outlined"
                />
              )}
            </SectionStyled>
            <SectionStyled className="focused-on" focusedOn>
              <h3>Focused on</h3>
              <ul>
                {focusedOn?.length ? (
                  focusedOn.map((item, index) => (
                    <li>
                      {edit === 'false' ? (
                        <p>{item}</p>
                      ) : (
                        <div className="form__list-input">
                          <TextField
                            className="form__input"
                            type="text"
                            onChange={(e) => handleArrayChange(e, index, focusedOn)}
                            value={item}
                            name="focusedOn"
                            placeholder="Enter focused on item"
                            variant="outlined"
                          />

                          <Icon
                            onClick={() => removeArrayElement('focusedOn', index)}
                            color="primary"
                          >
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
            </SectionStyled>
            <SectionStyled>
              <h3>Interested in</h3>

              <ul>
                <li>
                  <p>Democracy/Active citizenship</p>
                </li>
                <li>
                  <p>European citizenship</p>
                </li>
                <li>
                  <p>Intercultural dialogue</p>
                </li>
              </ul>
            </SectionStyled>
          </TabPanel>
          <TabPanel className="tab" value={tabValue} index={1}>
            {data?.projectsByOrganization?.map((project) => (
              <SingleProject key={project.id} project={project} userId={props.organization?.id} />
            ))}
          </TabPanel>
          <OrganizationSidebar
            className="organization__sidebar"
            edit={edit}
            responsiblePerson={responsiblePerson}
            website={website}
            phoneNumber={phoneNumber}
            email={props.organization?.email}
            handleChange={handleChange}
          />
          {/* <TabPanel className="tab" value={tabValue} index={2}>
            Item Three
          </TabPanel> */}
          {/* <SimilarOrganizations className="organization__similar" /> */}
        </section>
      </form>
    </OrganizationStyles>
  );
};

{
  /* <div>
                <h2 className="projects-title">Your currently active projects!</h2>
                <ul>
                  {projectsCreated.map((project) => (
                    <li>
                      <div className="project-details">
                        <div className="project-header">
                          <h4>{project.title}</h4>
                          <p>Type of project: {project.projectType}</p>
                        </div>
                        <div className="project-details__container">
                          <div className="description">
                            <h5>Project description</h5>
                            <p>{project.description}</p>
                          </div>
                          <ParticipatingCountires>
                            <h5 className="participating-countries__title">
                              Pariticipating Countries
                            </h5>
                            {countriesList(project.nations)}
                          </ParticipatingCountires>
                        </div>
                        <div className="project-details__container">
                          <div>
                            <h5>Costs</h5>
                            <p>{project.costs}</p>
                          </div>
                          <div className="location-date">
                            <p>Location: {project.location.address}</p>
                            <p>Start Date: 12/02/2020 - End Date: 12/02/2020</p>
                          </div>
                        </div>
                      </div>

                      <div className="project-rightpanel">
                        <div className="project-rightpanel__header">
                          <button onClick={() => this.handleDisplayApplicants(project)}>
                            Show Applicants
                          </button>
                          <button onClick={() => this.handleDisplayParticipants(project)}>
                            Show Participants
                          </button>
                        </div>
                        {displayApplicants && (
                          <>
                            {activeProject.id === project.id && (
                              <div>
                                <h3 className="rightpanel-title">Applications from participants</h3>
                                {activeProject.applicants.length ? (
                                  activeProject.applicants.map((applicant) => (
                                    <Applicant
                                      user={applicant}
                                      projectId={activeProject.id}
                                      key={applicant.id}
                                    />
                                  ))
                                ) : (
                                  <h4 className="rightpanel-title">There are no applicants yet.</h4>
                                )}
                              </div>
                            )}
                          </>
                        )}
                        {displayParticipants && (
                          <div>
                            {activeProject.id === project.id && (
                              <>
                                <h3 className="rightpanel-title">Accepted participants</h3>
                                <ul>
                                  {activeProject.participants.map((participant) => (
                                    <Participant participant={participant} key={activeProject.id} />
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */
}
