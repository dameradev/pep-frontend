import React from 'react';
import styled from 'styled-components';
import icons from '../../utils/icons';

import { SidebarStyled } from './styles';

const OrganizationSidebar = () => {
  return (
    <SidebarStyled>
      <h1>Contact</h1>
      <ul>
        <li>
          <h3>Responsible person</h3>
          <span>Comunità Montana Sirentina</span>
        </li>
        <li>
          <h3>E-mail</h3>
          <span>sustvallesubequana@gmail.com</span>
        </li>
        <li>
          <h3>Website</h3>
          <span>https://www.comunitamontanasirentina.it/</span>
        </li>
        <li>
          <h3>Phone</h3>
          <span>+30 322 442 553</span>
        </li>
      </ul>
    </SidebarStyled>
  );
};

export default OrganizationSidebar;
