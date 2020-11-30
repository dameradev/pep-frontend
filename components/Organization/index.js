import React, { Component, useState, useEffect, useContext } from 'react';
import { Query, Mutation, useLazyQuery, useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import styled from 'styled-components';

import OrganizationHeader from './OrganizationHeader';
import OrganizationSidebar from './OrganizationSidebar';
import SimilarOrganizations from './SimilarOrganizations';
import SingleProject from '../Projects/SingleProject';

import { PROJECTS_BY_ORGANIZATION } from '../../lib/queries';
import { UPDATE_ORGANIZATION } from '../../lib/mutations';
import useForm from '../../lib/useForm';

import { OrganizationStyles, SectionStyles } from './styles';
import { Box, Typography, TextField, Icon } from '@material-ui/core';

import UserContext from '../../contexts/userContext';

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const Organization = ({
  query: { id: queryId, edit, tab } = {},
  organization,
  organizationProfile,
}) => {
  const id = parseInt(queryId);
  const [tabValue, setTabValue] = useState(parseInt(tab) || 0);
  const [focusedOn, setFocusedOn] = useState(organizationProfile?.focusedOn);
  const [interestedIn, setInterestedIn] = useState(organizationProfile?.interestedIn);
  const {
    values: { name, slogan, summary, responsiblePerson, phoneNumber, website } = {},
    values,
    updateValue,
  } = useForm({
    name: organization.name,
    slogan: organizationProfile.slogan,
    summary: organizationProfile.summary,
    responsiblePerson: organizationProfile.responsiblePerson,
    phoneNumber: organizationProfile.phoneNumber,
    website: organizationProfile.website,
  });

  const [updateOrganization] = useMutation(UPDATE_ORGANIZATION);
  const { loading, error, data: { projectsByOrganization } = {} } = useQuery(
    PROJECTS_BY_ORGANIZATION,
    {
      variables: { id: id },
    }
  );

  const user = useContext(UserContext);

  const handleTabChange = (event, value) => {
    setTabValue(value);
  };

  const handleArrayChange = (e, index, array) => {
    const newArray = [...array];
    newArray[index] = e.target.value;

    switch (e.target.name) {
      case 'focusedOn':
        setFocusedOn(newArray);
        break;
      case 'interestedIn':
        setInterestedIn(newArray);
        break;
    }
  };

  const addArrayElement = (name) => {
    console.log(interestedIn);
    let newArray = name === 'focusedOn' ? focusedOn : interestedIn;
    console.log(newArray);
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

  return (
    <OrganizationStyles>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
              interestedIn,
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
          id={id}
          name={name}
          email={organization.email}
          slogan={slogan}
          edit={edit}
          className="organization__header"
          handleTabChange={handleTabChange}
          handleChange={updateValue}
          value={tabValue}
          userId={user?.id}
        />
        <section className={`organization__main ${tabValue === 0 && 'organization__about-us'}`}>
          <TabPanel className="tab organization__info" value={tabValue} index={0}>
            <SectionStyles>
              <h2>Summary</h2>
              {edit === 'false' ? (
                <p>{summary ? summary : 'Edit your page to enter summary'}</p>
              ) : (
                <TextField
                  className="form__input organization__summary"
                  type="text"
                  onChange={updateValue}
                  value={summary}
                  name="summary"
                  placeholder="Describe what your organization is about"
                  multiline
                  rows={8}
                  variant="outlined"
                />
              )}
            </SectionStyles>

            <SectionStyles focusedOn className="focused-on" edit={edit === 'true' ? true : false}>
              <h2>Focused on</h2>

              <ul>
                {focusedOn?.length ? (
                  focusedOn.map((item, index) => (
                    <li>
                      {edit === 'false' ? (
                        <p>{item}</p>
                      ) : (
                        <div className="form__group">
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
            </SectionStyles>
            <SectionStyles className="interested-in" edit={edit === 'true' ? true : false}>
              <h2>Interested in</h2>
              <ul>
                {interestedIn?.length ? (
                  interestedIn.map((item, index) => (
                    <li>
                      {console.log(interestedIn)}
                      {edit === 'false' ? (
                        <p>{item}</p>
                      ) : (
                        <div className="form__group">
                          <TextField
                            className="form__input"
                            type="text"
                            onChange={(e) => handleArrayChange(e, index, interestedIn)}
                            value={item}
                            name="interestedIn"
                            placeholder="Enter interested in item"
                            variant="outlined"
                          />

                          <Icon
                            onClick={() => removeArrayElement('interestedIn', index)}
                            color="primary"
                          >
                            remove_circle
                          </Icon>
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <p>Please add a what you're interested in by clicking on the plus icon below.</p>
                )}
              </ul>

              {edit !== 'false' && (
                <Icon onClick={() => addArrayElement('interestedIn')} color="primary">
                  add_circle
                </Icon>
              )}
            </SectionStyles>
          </TabPanel>
          <TabPanel className="tab projects-tab" value={tabValue} index={1}>
            {projectsByOrganization?.map((project) => (
              <SingleProject key={project.id} project={project} userId={id} />
            ))}
          </TabPanel>
          <OrganizationSidebar
            className="organization__sidebar"
            edit={edit}
            responsiblePerson={responsiblePerson}
            website={website}
            phoneNumber={phoneNumber}
            email={organization.email}
            handleChange={updateValue}
          />
        </section>
      </form>
    </OrganizationStyles>
  );
};
export default Organization;
