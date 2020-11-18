import React, { Component, useState, useEffect, useContext } from 'react';
import { Query, Mutation, useLazyQuery, useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import styled from 'styled-components';

import OrganizationHeader from './OrganizationHeader';
import OrganizationSidebar from './OrganizationSidebar';
import SimilarOrganizations from './SimilarOrganizations';
import SingleProject from '../Projects/SingleProject';

import { PROJECTS_BY_ORGANIZATION } from '../../utils/queries';
import { UPDATE_ORGANIZATION } from '../../utils/mutations';
import useForm from '../../lib/useForm';

import { OrganizationStyles, SectionStyles } from './styles';
import { Box, Typography, TextField, Icon } from '@material-ui/core';

import UserContext from '../../lib/auth';

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

const Organization = ({ id, path, edit, organization, organizationProfile }) => {
  const [tabValue, setTabValue] = useState(0);
  const {
    values: {
      name,
      slogan,
      summary,
      responsiblePerson,
      phoneNumber,
      website,
      focusedOn,
      interestedIn,
    } = {},
    values,
    updateValue,
  } = useForm({
    name: organization.name,
    slogan: organizationProfile.slogan,
    summary: organizationProfile.summary,
    responsiblePerson: organizationProfile.responsiblePerson,
    phoneNumber: organizationProfile.phoneNumber,
    website: organizationProfile.website,
    focusedOn: organizationProfile.focusedOn,
    interestedIn: organizationProfile.interestedIn,
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
              <h3>Summary</h3>
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
            <SectionStyles className="focused-on" focusedOn>
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
            </SectionStyles>
            <SectionStyles>
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
            </SectionStyles>
          </TabPanel>
          <TabPanel className="tab" value={tabValue} index={1}>
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
