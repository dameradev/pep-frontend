import React from 'react';
import styled from 'styled-components';
import icons from '../../utils/icons';

import { SidebarStyled } from './styles';

import { TextField } from '@material-ui/core';

const OrganizationSidebar = ({
  edit,
  responsiblePerson,
  phoneNumber,
  website,
  email,
  handleChange,
  className,
}) => {
  return (
    <SidebarStyled className={className}>
      <h1>Contact</h1>
      <ul>
        <li>
          <h3>Responsible person</h3>
          {edit === 'false' ? (
            <span>{responsiblePerson ? responsiblePerson : 'Contact person here'}</span>
          ) : (
            <TextField
              className="form__input"
              type="text"
              onChange={(e) => handleChange(e)}
              value={responsiblePerson}
              name="responsiblePerson"
              placeholder="Responsible person"
              variant="outlined"
            />
          )}
        </li>
        <li>
          <h3>E-mail</h3>
          <span>{email ? email : 'Your email here'}</span>
        </li>
        <li>
          <h3>Website</h3>
          {edit === 'false' ? (
            <a href={website} target="blank">
              View our website
            </a>
          ) : (
            <TextField
              className="form__input"
              type="text"
              // onChange={handleChange}
              onChange={(e) => handleChange(e)}
              // onBlur={handleBlur}
              value={website}
              name="website"
              placeholder="Website"
              // id="standard-basic"
              // label="Website"
              variant="outlined"
            />
          )}
        </li>
        <li>
          <h3>Phone</h3>
          {edit === 'false' ? (
            <span>{phoneNumber ? phoneNumber : 'Your phone number here'}</span>
          ) : (
            <TextField
              className="form__input"
              type="text"
              // onChange={handleChange}
              onChange={(e) => handleChange(e)}
              // onBlur={handleBlur}
              value={phoneNumber}
              name="phoneNumber"
              placeholder="Phone"
              // id="standard-basic"
              // label="Phone"
              variant="outlined"
            />
          )}
        </li>
      </ul>
    </SidebarStyled>
  );
};

export default OrganizationSidebar;
