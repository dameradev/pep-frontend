import React, { Component } from 'react';
import styled from "styled-components";

export const ButtonStyled = styled.button`
  margin-top: 2rem;
  width: 70%;
  padding: 2rem;
  background: transparent;
  border: 3px solid ${props => props.btnColor};
  color: ${props => props.theme.whiteGray};
  border-radius: 5px;
  font-size: 1.5rem;
  text-transform: uppercase;  
  

  &:hover {
    background: ${props => props.btnColor};
  }
`;

class SearchBox extends Component {
  
  render() {
    return (
      <div className="searchbox-container">
      <h2>Find the perfect project</h2>
      <select>
        <option label="Type of project"/>
      </select>
      <select>
        <option label="Activity"/>
      </select>
      <select>
        <option label="Location"/>
      </select>
      <select>
        <option label="Your Nationality"/>
      </select>
      <ButtonStyled>Search</ButtonStyled>
    </div>
    )
  }
}

export default SearchBox;