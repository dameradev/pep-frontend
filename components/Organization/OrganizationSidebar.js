import React from 'react';
import styled from 'styled-components';
import icons from '../../utils/icons';

const SidebarStyled = styled.aside`
  grid-row: 2 / 3;
  grid-column: center-start/ col-end 2;
  /* box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1); */
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 10px;
  /* margin-top: 2.5rem; */
  padding: 1.5rem 3rem;

  h1 {
    padding: 1rem 0 2rem 0;
    margin-bottom: 1.5rem;
    font-weight: 100;
    border-bottom: 1px solid #ccc;
  }
  /* color: #808080; */
  ul {
    margin: 0;
    li {
      /* text-transform: uppercase; */
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      h3 {
        color: #a0a0a0;
        font-weight: 100;
        font-size: 1.6rem;
      }

      /* align-items: center; */
    }
  }
`;

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
