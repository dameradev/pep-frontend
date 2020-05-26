import React, { Component } from 'react';
import Select from 'react-select';

import styled from 'styled-components';

const Panel = styled.div`
  margin-top: 2rem;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 7px;
  min-height: 80vh;
  /* padding: 20px; */

  .Header {
    border-bottom: 1px solid #ccc;
    padding: 2rem;

    h3 {
      text-transform: uppercase;
      font-size: 2.5rem;
      font-weight: 100;
    }
  }
  .filters {
    padding: 2rem;
    display: grid;
    grid-gap: 2rem;
    &__location {
      min-width: 20rem;
    }
  }
`;

export default class SearchPanel extends Component {
  render() {
    return (
      <Panel>
        <div className="Header">
          <h3> Search filters </h3>
        </div>
        <div className="filters">
          <Select className="filters__location" placeholder="Location" />
          <Select className="filters__type" placeholder="Type of project" />
        </div>
      </Panel>
    );
  }
}
