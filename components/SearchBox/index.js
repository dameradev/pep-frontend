import React, { Component } from 'react';
import ButtonStyled from '../styles/ButtonStyled';

class SearchBox extends Component {
  render() {
    return (
      <div className="searchbox-container">
        <h2>Find the perfect project</h2>
        <select>
          <option label="Type of project" />
        </select>
        <select>
          <option label="Activity" />
        </select>
        <select>
          <option label="Location" />
        </select>
        <select>
          <option label="Your Nationality" />
        </select>
        <ButtonStyled>Search</ButtonStyled>
      </div>
    );
  }
}

export default SearchBox;
